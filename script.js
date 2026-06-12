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
// 3. التحكم بقائمة الموبايل (Hamburger Menu)
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileBtnToggle = document.getElementById('theme-toggle-mobile');

// فتح وإغلاق القائمة عند الضغط على زر البرجر
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // تغيير شكل الأيقونة بين (☰) و (✕) عند الفتح والإغلاق
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });
}

// إغلاق القائمة تلقائياً عند الضغط على أي رابط داخلي للانتقال
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            }
        }
    });
});

// ربط زر التبديل الخاص بالموبايل بنفس وظيفة الزر الرئيسي
if (mobileBtnToggle) {
    mobileBtnToggle.addEventListener('click', () => {
        if (toggleBtn) toggleBtn.click(); // يستدعي ضغطة الزر الأصلي لتغيير الوضع
    });
}