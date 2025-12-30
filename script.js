/* ============================================
   بن الحسين - ملف جافا سكريبت الرئيسي
   الوصف: يتعامل مع جميع العناصر التفاعلية
   ============================================ */

// ============================================
// 1. قائمة التنقل للموبايل
// الغرض: تبديل قائمة الهامبرجر للموبايل
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تحريك أيقونة الهامبرجر
            const spans = hamburger.getElementsByTagName('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.getElementsByTagName('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ============================================
// 2. تأثير التمرير على شريط التنقل
// الغرض: تغيير مظهر شريط التنقل عند التمرير
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.8)';
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    }
});

// ============================================
// 3. أكورديون الأسئلة الشائعة
// الغرض: تبديل ظهور إجابات الأسئلة الشائعة
// ============================================

/**
 * يبدل ظهور إجابة السؤال الشائع
 * @param {HTMLElement} button - زر السؤال الذي تم النقر عليه
 */
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    // إغلاق جميع الأسئلة الأخرى
    const allQuestions = document.querySelectorAll('.faq-question');
    const allAnswers = document.querySelectorAll('.faq-answer');
    
    allQuestions.forEach(q => q.classList.remove('active'));
    allAnswers.forEach(a => {
        a.classList.remove('active');
        a.style.maxHeight = '0';
    });
    
    // تبديل السؤال الحالي
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// ============================================
// 4. التمرير السلس
// الغرض: تمرير سلس لروابط المرساة
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // تخطي إذا كان الرابط فقط #
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 5. حركات التمرير (Intersection Observer)
// الغرض: إضافة حركات عند ظهور العناصر
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // مراقبة كروت الخدمات
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('lazy-load');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // مراقبة عناصر المعرض
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('lazy-load');
        item.style.transitionDelay = `${(index % 3) * 0.1}s`; 
        observer.observe(item);
    });
    
    // مراقبة عناصر الأسئلة الشائعة
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.classList.add('lazy-load');
        item.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(item);
    });
    
    // مراقبة تفاصيل الخدمات
    const serviceDetails = document.querySelectorAll('.service-detail');
    serviceDetails.forEach((detail, index) => {
        detail.classList.add('lazy-load');
        detail.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(detail);
    });
    
    // مراقبة أقسام من نحن
    const aboutSections = document.querySelectorAll('.about-section');
    aboutSections.forEach((section, index) => {
        section.classList.add('lazy-load');
        section.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(section);
    });
    
    // مراقبة محتوى الترحيب
    const welcomeText = document.querySelector('.welcome-text');
    const welcomeImage = document.querySelector('.welcome-image');
    
    if (welcomeText) {
        welcomeText.classList.add('lazy-load');
        observer.observe(welcomeText);
    }
    
    if (welcomeImage) {
        welcomeImage.classList.add('lazy-load');
        welcomeImage.style.transitionDelay = '0.2s';
        observer.observe(welcomeImage);
    }
    
    // مراقبة عناصر الاتصال
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) {
        contactInfo.classList.add('lazy-load');
        observer.observe(contactInfo);
    }
    
    if (contactForm) {
        contactForm.classList.add('lazy-load');
        contactForm.style.transitionDelay = '0.2s';
        observer.observe(contactForm);
    }
});

// ============================================
// 6. حركة عداد الإحصائيات
// الغرض: تحريك الأرقام في إحصائيات البطل
// ============================================

/**
 * يحرك رقماً من 0 إلى القيمة المستهدفة
 */
function animateNumber(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.dataset.suffix || '+');
    }, 16);
}

// تشغيل حركة الإحصائيات عند الظهور
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    if(text.includes('%')) entry.target.dataset.suffix = '%';
                    else entry.target.dataset.suffix = '+';

                    if (!isNaN(number)) {
                        entry.target.textContent = '0';
                        animateNumber(entry.target, number, 2000);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
});

// ============================================
// 7. معالجة إرسال النموذج
// الغرض: حالة التحميل لنموذج الاتصال
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            
            // التحقق الأساسي
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('من فضلك املأ جميع الحقول المطلوبة!');
                return false;
            }

            if (submitButton && !submitButton.disabled) {
                submitButton.disabled = true;
                submitButton.textContent = 'جاري الإرسال...';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'تم الإرسال!';
                    this.reset();
                    
                    setTimeout(() => {
                         submitButton.textContent = 'إرسال الطلب';
                    }, 3000);
                }, 1500);
            }
        });
    }
});

// ============================================
// 8. رسالة وحدة التحكم
// ============================================
console.log('%c☕ بن الحسين', 'color: #8D6E63; font-size: 20px; font-weight: bold;');
console.log('%cقهوة مصرية أصيلة', 'color: #D7CCC8; font-size: 14px;');