// Language Switcher
const translations = {
    en: {
        title: "Welcome to Al-As'ilah",
        description: "Generate Arabic Exam Questions Easily and Efficiently",
        aboutHeading: "About the System",
        aboutDescription: "Al-As'ilah helps educators generate Arabic language exam questions tailored for students' needs. Explore various formats and topics seamlessly.",
        login: "Login",
        signup: "Sign Up",
        objectiveHeading: "OUR OBJECTIVE",
        objectiveDescription: "To develop an Arabic exam question generator that uses NLP to produce Elementary Level questions. The system helps lecturers by generating customizable multiple-choice or short-answer questions based on user-selected topics, making Arabic learning more accessible and engaging.",
        supportHeading: "SUPPORTING LECTURERS IN ARABIC EXAM QUESTION CREATION",
        supportDescription: "Saving lecturers time and effort in creating exam questions by generating tailored questions that reduce redundancy and align with university-specific exam formats and requirements.",
        whyHeading: "WHY ARABIC?",
        whyDescription: "Arabic is the language of the Quran and Jannah, used by Muslims all over the world. Its unique grammar characteristic, vast vocabulary and significance in Islam make it an essential language to learn.",
        ctaHeading: "TRY AL-AS'ILAH NOW!",
        ctaDescription: "Start generating Arabic exam questions effortlessly with our powerful tools.",
        signupCTA: "Sign Up Now",
        queryFormHeading: "Generate New Questions",
        queryLabel: "Enter Query",
        questionCountLabel: "Number of Questions",
        questionTypeLabel: "Question Type",
        questionTypeOptionMCQ: "Multiple Choice",
        questionTypeOptionShortAnswer: "Short Answer",
        generateButton: "Generate",
        exportAllButton: "Export All",
        generatedQuestionsHeading: "Generated Questions",
        noQuestionsMessage: "No questions generated yet.",
        exportButton: "Export to DOCX",
        deleteButton: "Delete Questions",
        newQuestionButton: "New Question",
        loginHeading: "Login",
        emailLabel: "Email",
        emailPlaceholder: "Enter your email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        loginButton: "Login",
        signupPrompt: "Don't have an account? <a href='/signup'>Sign up</a>",
        staffIdLabel: "Staff ID",
        staffIdPlaceholder: "Enter your Staff ID",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your password",
    },
    ar: {
        title: "'مرحبًا بكم في 'الأسئلة",
        description: "قم بإنشاء أسئلة امتحانات اللغة العربية بسهولة وكفاءة",
        aboutHeading: "حول النظام",
        aboutDescription: "يساعد الأسئلة المعلمين في إنشاء أسئلة امتحانات اللغة العربية المصممة خصيصًا لاحتياجات الطلاب. استكشف التنسيقات والمواضيع المختلفة بسهولة.",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        objectiveHeading: "هدفنا",
        objectiveDescription: "تطوير مولد أسئلة امتحانات عربية يستخدم الذكاء الاصطناعي لإنتاج أسئلة للمستوى الابتدائي. يساعد النظام المحاضرين في إنشاء أسئلة قابلة للتخصيص بناءً على الموضوعات المختارة، مما يجعل تعلم اللغة العربية أكثر سهولة وجاذبية.",
        supportHeading: "دعم المحاضرين في إنشاء أسئلة امتحانات اللغة العربية",
        supportDescription: "توفير الوقت والجهد على المحاضرين في إنشاء أسئلة الامتحانات من خلال توليد أسئلة مخصصة تقلل التكرار وتتناسب مع تنسيقات ومتطلبات الامتحانات الجامعية.",
        whyHeading: "لماذا العربية؟",
        whyDescription: "العربية هي لغة القرآن والجنة، يستخدمها المسلمون في جميع أنحاء العالم. تُعد قواعدها الفريدة ومفرداتها الواسعة وأهميتها في الإسلام سببًا جوهريًا لتعلمها.",
        ctaHeading: "!جرب 'الأسئلة' الآن",
        ctaDescription: "ابدأ في إنشاء أسئلة امتحانات اللغة العربية بسهولة باستخدام أدواتنا القوية.",
        signupCTA: "اشترك الآن",
        queryFormHeading: "إنشاء أسئلة جديدة",
        queryLabel: "أدخل الاستعلام",
        questionCountLabel: "عدد الأسئلة",
        questionTypeLabel: "نوع السؤال",
        questionTypeOptionMCQ: "اختيار من متعدد",
        questionTypeOptionShortAnswer: "إجابة قصيرة",
        generateButton: "إنشاء",
        exportAllButton: "تصدير الكل",
        generatedQuestionsHeading: "الأسئلة المولدة",
        noQuestionsMessage: "لم يتم إنشاء أسئلة حتى الآن.",
        exportButton: "تصدير إلى DOCX",
        deleteButton: "حذف الأسئلة",
        newQuestionButton: "سؤال جديد",
        loginHeading: "تسجيل الدخول",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        passwordLabel: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور",
        loginButton: "تسجيل الدخول",
        signupPrompt: "ليس لديك حساب؟ <a href='/signup'>إنشاء حساب</a>",
        staffIdLabel: "رقم الموظف",
        staffIdPlaceholder: "أدخل رقم الموظف الخاص بك",
        confirmPasswordLabel: "تأكيد كلمة المرور",
        confirmPasswordPlaceholder: "تأكيد كلمة المرور الخاصة بك",
    }
};

function switchLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    if (!languageToggle) {
        console.error("Language toggle button not found.");
        return;
    }

    const currentLanguage = languageToggle.textContent.trim();

    if (currentLanguage === 'العربية') {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.body.style.fontFamily = 'Amiri, Poppins';
        languageToggle.textContent = 'English';
        updateContent('ar');
        console.log("Switched to Arabic.");
    } else {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.body.style.fontFamily = 'Poppins, sans-serif';
        languageToggle.textContent = 'العربية';
        updateContent('en');
        console.log("Switched to English.");
    }
}

function updateContent(language) {
    try {
        // Section 1
        const section1Title = document.querySelector('#section-1 h1');
        if (section1Title) {
            section1Title.textContent = translations[language].title;
        } else {
            console.warn("Section 1 title not found.");
        }

        const section1Desc = document.querySelector('#section-1 p');
        if (section1Desc) {
            section1Desc.textContent = translations[language].description;
        } else {
            console.warn("Section 1 description not found.");
        }

        // Section 2
        const slide1Heading = document.querySelector('.slide:nth-child(1) h3');
        if (slide1Heading) {
            slide1Heading.textContent = translations[language].objectiveHeading;
        } else {
            console.warn("Slide 1 heading not found.");
        }

        const slide1Desc = document.querySelector('.slide:nth-child(1) p');
        if (slide1Desc) {
            slide1Desc.textContent = translations[language].objectiveDescription;
        } else {
            console.warn("Slide 1 description not found.");
        }

        const slide2Heading = document.querySelector('.slide:nth-child(2) h3');
        if (slide2Heading) {
            slide2Heading.textContent = translations[language].supportHeading;
        } else {
            console.warn("Slide 2 heading not found.");
        }

        const slide2Desc = document.querySelector('.slide:nth-child(2) p');
        if (slide2Desc) {
            slide2Desc.textContent = translations[language].supportDescription;
        } else {
            console.warn("Slide 2 description not found.");
        }

        const slide3Heading = document.querySelector('.slide:nth-child(3) h3');
        if (slide3Heading) {
            slide3Heading.textContent = translations[language].whyHeading;
        } else {
            console.warn("Slide 3 heading not found.");
        }

        const slide3Desc = document.querySelector('.slide:nth-child(3) p');
        if (slide3Desc) {
            slide3Desc.textContent = translations[language].whyDescription;
        } else {
            console.warn("Slide 3 description not found.");
        }

        // Section 3
        const section3Heading = document.querySelector('#section-3 h2');
        if (section3Heading) {
            section3Heading.textContent = translations[language].ctaHeading;
        } else {
            console.warn("Section 3 heading not found.");
        }

        const section3Desc = document.querySelector('#section-3 p');
        if (section3Desc) {
            section3Desc.textContent = translations[language].ctaDescription;
        } else {
            console.warn("Section 3 description not found.");
        }

        const section3Link = document.querySelector('#section-3 a');
        if (section3Link) {
            section3Link.textContent = translations[language].signupCTA;
        } else {
            console.warn("Section 3 link not found.");
        }

        // Navigation Bar
        const loginLink = document.querySelector('.nav-links a[href="/login"]');
        if (loginLink) {
            loginLink.textContent = translations[language].login;
        } else {
            console.warn("Login link not found.");
        }

        const signupLink = document.querySelector('.nav-links a[href="/signup"]');
        if (signupLink) {
            signupLink.textContent = translations[language].signup;
        } else {
            console.warn("Signup link not found.");
        }

        // For dashboard.html
        const queryFormHeading = document.querySelector('#query-form-section h2');
        if (queryFormHeading) {
            queryFormHeading.textContent = translations[language].queryFormHeading;
        } else {
            console.warn("Query form heading not found.");
        }

        const queryLabel = document.querySelector('label[for="query"]');
        if (queryLabel) {
            queryLabel.textContent = translations[language].queryLabel;
        } else {
            console.warn("Query label not found.");
        }

        const questionCountLabel = document.querySelector('label[for="question-count"]');
        if (questionCountLabel) {
            questionCountLabel.textContent = translations[language].questionCountLabel;
        } else {
            console.warn("Question count label not found.");
        }

        const questionTypeLabel = document.querySelector('label[for="question-type"]');
        if (questionTypeLabel) {
            questionTypeLabel.textContent = translations[language].questionTypeLabel;
        } else {
            console.warn("Question type label not found.");
        }

        const questionTypeOptions = document.querySelectorAll('#question-type option');
        if (questionTypeOptions.length > 0) {
            questionTypeOptions[0].textContent = translations[language].questionTypeOptionMCQ;
            questionTypeOptions[1].textContent = translations[language].questionTypeOptionShortAnswer;
        } else {
            console.warn("Question type options not found.");
        }

        const generateButton = document.querySelector('#query-form-section button[type="submit"]');
        if (generateButton) {
            generateButton.textContent = translations[language].generateButton;
        } else {
            console.warn("Generate button not found.");
        }

        const exportAllButton = document.querySelector('#export-all-btn');
        if (exportAllButton) {
            exportAllButton.textContent = translations[language].exportAllButton;
        } else {
            console.warn("Export all button not found.");
        }

        const generatedQuestionsHeading = document.querySelector('#generated-questions-section h2');
        if (generatedQuestionsHeading) {
            generatedQuestionsHeading.textContent = translations[language].generatedQuestionsHeading;
        } else {
            console.warn("Generated questions heading not found.");
        }

        const noQuestionsMessage = document.querySelector('#generated-questions-section p');
        if (noQuestionsMessage) {
            noQuestionsMessage.textContent = translations[language].noQuestionsMessage;
        } else {
            console.warn("No questions message not found.");
        }

        const exportButton = document.querySelector('#export-question-btn');
        if (exportButton) {
            exportButton.textContent = translations[language].exportButton;
        } else {
            console.warn("Export button not found.");
        }

        const deleteButton = document.querySelector('#delete-question-btn');
        if (deleteButton) {
            deleteButton.textContent = translations[language].deleteButton;
        } else {
            console.warn("Delete button not found.");
        }

        const newQuestionButton = document.querySelector('#new-question-btn');
        if (newQuestionButton) {
            newQuestionButton.textContent = translations[language].newQuestionButton;
        } else {
            console.warn("New question button not found.");
        }
    } catch (error) {
        console.error("Error updating content: ", error);
    }

        // For login.html
        const loginHeading = document.querySelector('#signup-section h1');
        if (loginHeading) loginHeading.textContent = translations[language].loginHeading;
    
        const emailLabel = document.querySelector('label[for="email"]');
        if (emailLabel) emailLabel.textContent = translations[language].emailLabel;

        const emailPlaceholder = document.querySelector('#email');
        if (emailPlaceholder) emailPlaceholder.placeholder = translations[language].emailPlaceholder;
    
        const passwordLabel = document.querySelector('label[for="password"]');
        if (passwordLabel) passwordLabel.textContent = translations[language].passwordLabel;
    
        const passwordPlaceholder = document.querySelector('#password');
        if (passwordPlaceholder) passwordPlaceholder.placeholder = translations[language].passwordPlaceholder;
    
        const submitButton = document.querySelector('.btn-submit');
        if (submitButton) submitButton.textContent = translations[language].loginButton;
    
        const signupPrompt = document.querySelector('#signup-section p');
        if (signupPrompt) signupPrompt.innerHTML = translations[language].signupPrompt;

        const staffIdLabel = document.querySelector('label[for="staff-id"]');
        if (staffIdLabel) staffIdLabel.textContent = translations[language].staffIdLabel;
    
        const staffIdPlaceholder = document.querySelector('#staff-id');
        if (staffIdPlaceholder) staffIdPlaceholder.placeholder = translations[language].staffIdPlaceholder;

        const confirmPasswordLabel = document.querySelector('label[for="confirm-password"]');
        if (confirmPasswordLabel) confirmPasswordLabel.textContent = translations[language].confirmPasswordLabel;
    
        const confirmPasswordPlaceholder = document.querySelector('#confirm-password');
        if (confirmPasswordPlaceholder) confirmPasswordPlaceholder.placeholder = translations[language].confirmPasswordPlaceholder;
    }


// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const slidesContainer = document.querySelector('.slides');
    if (!slidesContainer) {
        console.error("Slides container not found.");
        return;
    }
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    if (totalSlides === 0) {
        console.warn("No slides available.");
        return;
    }
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    if (totalSlides === 0) {
        console.warn("No slides available.");
        return;
    }
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-Slide Carousel Logic
let autoSlideInterval;

function startAutoSlide() {
    if (totalSlides === 0) {
        console.warn("No slides available for auto-slide.");
        return;
    }
    autoSlideInterval = setInterval(nextSlide, 10000); // Slides every 5 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Add Event Listeners for Carousel Buttons
document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
    } else {
        console.error("Language toggle button not found during initialization.");
    }

    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Restart auto-slide
        });
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Restart auto-slide
        });
    } else {
        console.warn("Carousel buttons not found.");
    }

    // Pause auto-slide when hovering over the carousel
    const slidesContainer = document.querySelector('.carousel');
    if (slidesContainer) {
        slidesContainer.addEventListener('mouseenter', stopAutoSlide);
        slidesContainer.addEventListener('mouseleave', startAutoSlide);
    } else {
        console.warn("Carousel container not found.");
    }

    // Initialize the first slide
    showSlide(currentSlide);

    // Start auto-sliding
    startAutoSlide();
});

