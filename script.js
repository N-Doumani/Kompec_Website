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
// ==========================================
// 1. قاعدة بيانات المنتجات ثنائية اللغة
// ==========================================
const exchangeRate = 14500; 

const productsData = [
    { 
        nameAr: "ماوس جيمنج احترافي RGB", nameEn: "Professional RGB Gaming Mouse", 
        category: "mice", priceUSD: 12.5, inStock: true, 
        descAr: "حساسية تصل إلى 8000 DPI مع أزرار جانبية مبرمجة.", descEn: "Sensitivity up to 8000 DPI with programmable side buttons." 
    },
    { 
        nameAr: "كيبورد ميكانيكي سويتش أزرق", nameEn: "Mechanical Keyboard (Blue Switch)", 
        category: "keyboards", priceUSD: 24.5, inStock: true, 
        descAr: "لوحة مفاتيح ميكانيكية كاملة مقاومة للغبار.", descEn: "Full mechanical keyboard, dustproof." 
    },
    { 
        nameAr: "سماعة محيطية 7.1 مع مايك", nameEn: "7.1 Surround Headset with Mic", 
        category: "headsets", priceUSD: 20.0, inStock: false, 
        descAr: "عزل صوت ممتاز مع وسادات مريحة للاستخدام الطويل.", descEn: "Excellent sound isolation with comfortable ear pads." 
    },
    { 
        nameAr: "فلاشة 64 جيجابايت USB 3.2", nameEn: "64GB USB 3.2 Flash Drive", 
        category: "storage", priceUSD: 6.0, inStock: true, 
        descAr: "سرعة نقل بيانات فائقة وهيكل معدني متين.", descEn: "Ultra-fast data transfer and durable metal body." 
    }
];

function renderProducts() {
    const productsMain = document.getElementById('products-main');
    if (!productsMain) return;

    // قراءة لغة الصفحة الحالية من ملف الـ HTML
    const isEnglish = document.documentElement.lang === 'en';

    const containers = {
        'mice': document.getElementById('mice-container'),
        'keyboards': document.getElementById('keyboards-container'),
        'headsets': document.getElementById('headsets-container'),
        'storage': document.getElementById('storage-container')
    };

    productsData.forEach(product => {
        const priceSYP = (product.priceUSD * exchangeRate).toLocaleString();
        
        // اختيار النصوص بناءً على اللغة
        const name = isEnglish ? product.nameEn : product.nameAr;
        const desc = isEnglish ? product.descEn : product.descAr;
        const currency = isEnglish ? "SYP" : "ل.س";
        const inStockText = isEnglish ? "In Stock" : "متوفر";
        const outOfStockText = isEnglish ? "Out of Stock" : "نفدت الكمية";

        const stockBadge = product.inStock 
            ? `<span class="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 font-bold">${inStockText}</span>` 
            : `<span class="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded border border-red-500/20 font-bold">${outOfStockText}</span>`;

        const cardHTML = `
            <div class="custom-card rounded-2xl border custom-border overflow-hidden group hover:border-[#2563eb] transition-all duration-300 reveal shadow-md">
                <div class="h-44 bg-gray-900/50 flex items-center justify-center text-gray-500 text-xs border-b custom-border">
                    [ Image ]
                </div>
                <div class="p-5 flex flex-col justify-between h-[180px]">
                    <div>
                        <h3 class="font-bold custom-text mb-2 text-sm leading-tight">${name}</h3>
                        <p class="custom-muted text-xs mb-4 line-clamp-2">${desc}</p>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="flex flex-col">
                            <span class="custom-muted text-[11px] mb-0.5 font-mono">$${product.priceUSD}</span>
                            <span class="font-black text-sm text-[#06b6d4]">${priceSYP} ${currency}</span>
                        </div>
                        ${stockBadge}
                    </div>
                </div>
            </div>
        `;

        if(containers[product.category]) {
            containers[product.category].innerHTML += cardHTML;
        }
    });
}
document.addEventListener('DOMContentLoaded', renderProducts);

// أبقِ كود البرجر والأنيميشن هنا أسفل هذا السطر...

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