// 1. ميزة تبديل الوضع (Light/Dark Mode) لجميع الصفحات
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('theme-toggle-icon');

// التحقق من الوضع المحفوظ في ذاكرة المتصفح
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    if (toggleIcon) toggleIcon.innerText = '🌙';
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        
        if (document.body.classList.contains('light')) {
            if (toggleIcon) toggleIcon.innerText = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            if (toggleIcon) toggleIcon.innerText = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// 2. أنيميشن ظهور العناصر عند التمرير (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // إضافة كلاس الإظهار
        }
    });
}, { 
    threshold: 0.15 // يبدأ الأنيميشن عندما يظهر 15% من العنصر على الشاشة
});

// البحث عن جميع العناصر التي تحمل كلاس reveal ومراقبتها
const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));