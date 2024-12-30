from flask import Flask, render_template, request, redirect, flash, session, send_file
from argon2 import PasswordHasher, exceptions
import sqlite3
import os
from models.question_generator import generate_questions, save_questions_to_docx
import re

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

ph = PasswordHasher()

def get_db_connection():
    return sqlite3.connect('users.db')

# Ensure export directory exists
EXPORT_DIR = 'exports'
os.makedirs(EXPORT_DIR, exist_ok=True)

@app.route('/')
def home():
    print("Rendering the home page.")
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        staff_id = request.form['staff_id']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return redirect('/signup')

        try:
            hashed_password = ph.hash(password)

            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO users (email, staff_id, password) VALUES (?, ?, ?)
                ''', (email, staff_id, hashed_password))
                conn.commit()
                flash('Account created successfully!', 'success')
                return redirect('/login')
        except sqlite3.IntegrityError:
            flash('Email already exists!', 'error')
            return redirect('/signup')

    return render_template('signup.html')


# login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('SELECT id, password FROM users WHERE email = ?', (email,))
                user = cursor.fetchone()

                if user:
                    try:
                        if ph.verify(user[1], password):  # Verify the hashed password
                            session['user_id'] = user[0]  # Store user ID in session
                            flash('Login successful!', 'success')
                            return redirect('/dashboard')  # Redirect to dashboard
                    except exceptions.VerifyMismatchError:
                        flash('Invalid password!', 'error')  # More specific error
                else:
                    flash('Email not found!', 'error')  # Handle email not existing
        except sqlite3.Error as e:
            flash('Database error occurred. Please try again later.', 'error')
            print(f"Database error: {e}")  # Log the error for debugging

    return render_template('login.html')



# profile

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if 'user_id' not in session:  # Ensure user is logged in
        return redirect('/login')

    user_id = session['user_id']
    conn = get_db_connection()
    cursor = conn.cursor()

    if request.method == 'POST':
        email = request.form['email']
        staff_id = request.form['staff_id']
        current_password = request.form['current_password']
        new_password = request.form['new_password']
        confirm_new_password = request.form['confirm_new_password']

        # Fetch current user details
        cursor.execute('SELECT email, staff_id, password FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()

        # Validate current password
        if not ph.verify(user[2], current_password):
            flash('Incorrect current password!', 'error')
            return redirect('/profile')

        # Update user details
        if new_password and new_password == confirm_new_password:
            hashed_new_password = ph.hash(new_password)
            cursor.execute('UPDATE users SET email = ?, staff_id = ?, password = ? WHERE id = ?',
                           (email, staff_id, hashed_new_password, user_id))
        else:
            cursor.execute('UPDATE users SET email = ?, staff_id = ? WHERE id = ?',
                           (email, staff_id, user_id))

        conn.commit()
        conn.close()
        flash('Profile updated successfully!', 'success')
        return redirect('/profile')

    # Pre-fill form with existing user data
    cursor.execute('SELECT email, staff_id FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()

    return render_template('profile.html', email=user[0], staff_id=user[1])


    # dashboard
import re

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user_id' not in session:
        flash('You need to log in to access the dashboard.', 'error')
        return redirect('/login')

    if request.method == 'POST':
        query = request.form['query']
        question_count = int(request.form['question_count'])
        question_type = request.form['question_type']

        try:
            # Generate questions using the model
            generated_questions = generate_questions(query, question_count, question_type)

            # Ensure Answer Options are properly split
            for question in generated_questions:
                if "Answer Options" in question and isinstance(question["Answer Options"], str):
                    question["Answer Options"] = [opt.strip() for opt in question["Answer Options"].split("؛")]

            # Save query and questions to session
            if 'queries' not in session:
                session['queries'] = []
            session['queries'].append({
                'query': query,
                'questions': generated_questions
            })
            session.modified = True

            flash(f"Generated {question_count} questions for '{query}'.", 'success')
        except Exception as e:
            flash(f"Error generating questions: {e}", 'error')

    queries = session.get('queries', [])
    return render_template('dashboard.html', queries=queries)



from flask import send_file, jsonify, request
from io import BytesIO
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

@app.route('/export_question', methods=['POST'])
def export_question():
    """Export filtered questions based on user query to a .docx file."""
    try:
        # Fetch the filtered questions from the request
        questions = request.json.get('questions', [])
        print("Received questions for export:", questions)  # Debugging log

        if not questions:
            return jsonify({"error": "No questions to export"}), 400

        # Create a new Word document
        doc = Document()

        # Set global RTL alignment
        for section in doc.sections:
            section.right_to_left = True

        # Set font style for Arabic text
        style = doc.styles['Normal']
        style.font.name = 'Arial'
        style.font.size = Pt(12)

        # Add a title to the document
        title = doc.add_heading('الأسئلة المولدة', level=1)
        title.alignment = WD_ALIGN_PARAGRAPH.RIGHT

        # Add each question with its options
        for question_data in questions:
            # Validate and parse question data
            parts = question_data.split("\n")
            if len(parts) < 2:  # Ensure at least one option exists
                continue
            question_text = parts[0].strip()
            options = [opt.strip() for opt in parts[1:] if opt.strip()]

            # Add question text with explicit RTL enforcement
            question_para = doc.add_paragraph()
            question_run = question_para.add_run(question_text)
            question_para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
            question_para.paragraph_format.right_to_left = True

            # Explicitly set RTL for content in run
            rtl_element = question_run._element.get_or_add_rPr().get_or_add_rtl()
            rtl_element.text = "true"

            # Add options with explicit RTL enforcement
            for option in options:
                option_para = doc.add_paragraph()
                option_run = option_para.add_run(option)
                option_para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
                option_para.paragraph_format.right_to_left = True
                rtl_element = option_run._element.get_or_add_rPr().get_or_add_rtl()
                rtl_element.text = "true"

            # Add spacing between questions
            doc.add_paragraph()

        # Save the document to memory
        doc_io = BytesIO()
        doc.save(doc_io)
        doc_io.seek(0)

        # Return the document as a downloadable file
        return send_file(doc_io, as_attachment=True, download_name="questions.docx")

    except Exception as e:
        print("Error during export:", e)
        return jsonify({"error": "An error occurred during export"}), 500









    return send_file(filepath, as_attachment=True, download_name=filename)




from flask import session, redirect

@app.route('/logout')
def logout():
    session.clear()  # Clears all session data
    return redirect('/')  # Redirect to homepage



import os

if __name__ == '__main__':
    print("Starting the Flask application.")
    # Get the port from the environment variable or use a default value (5000)
    port = int(os.environ.get("PORT", 5000))
    # Bind the app to 0.0.0.0 and the dynamic port for Render compatibility
    app.run(host="0.0.0.0", port=port, debug=True)

