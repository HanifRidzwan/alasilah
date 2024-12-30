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
        signupCTA: "Sign Up Now"
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
        signupCTA: "اشترك الآن"
    }
};

function switchLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    const currentLanguage = languageToggle.textContent.trim();

    if (currentLanguage === 'العربية') {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.body.style.fontFamily = 'Amiri, Poppins';
        languageToggle.textContent = 'English';
        updateContent('ar');
    } else {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.body.style.fontFamily = 'Poppins, sans-serif';
        languageToggle.textContent = 'العربية';
        updateContent('en');
    }
}

function updateContent(language) {
    // Section 1
    document.querySelector('#section-1 h1').textContent = translations[language].title;
    document.querySelector('#section-1 p').textContent = translations[language].description;

    // Section 2
    document.querySelector('.slide:nth-child(1) h3').textContent = translations[language].objectiveHeading;
    document.querySelector('.slide:nth-child(1) p').textContent = translations[language].objectiveDescription;

    document.querySelector('.slide:nth-child(2) h3').textContent = translations[language].supportHeading;
    document.querySelector('.slide:nth-child(2) p').textContent = translations[language].supportDescription;

    document.querySelector('.slide:nth-child(3) h3').textContent = translations[language].whyHeading;
    document.querySelector('.slide:nth-child(3) p').textContent = translations[language].whyDescription;

    // Section 3
    document.querySelector('#section-3 h2').textContent = translations[language].ctaHeading;
    document.querySelector('#section-3 p').textContent = translations[language].ctaDescription;
    document.querySelector('#section-3 a').textContent = translations[language].signupCTA;

    // Navigation Bar
    document.querySelector('.nav-links a[href="/login"]').textContent = translations[language].login;
    document.querySelector('.nav-links a[href="/signup"]').textContent = translations[language].signup;
}


// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-Slide Carousel Logic
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 10000); // Slides every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Add Event Listeners for Carousel Buttons
document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
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
    }

    // Pause auto-slide when hovering over the carousel
    const slidesContainer = document.querySelector('.carousel');
    slidesContainer.addEventListener('mouseenter', stopAutoSlide);
    slidesContainer.addEventListener('mouseleave', startAutoSlide);

    // Initialize the first slide
    showSlide(currentSlide);

    // Start auto-sliding
    startAutoSlide();
});
