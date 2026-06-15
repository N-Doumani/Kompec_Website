// ==========================================
// 1. قاعدة بيانات المنتجات ثنائية اللغة لـ KOMPEC
// ==========================================
const exchangeRate = 14500; // تحديث سعر الصرف اليومي هنا

const productsData = [
    // ================= قسم الماوسات (Mice) =================
    { 
        nameAr: "ماوس جيمنج احترافي RGB", nameEn: "Professional RGB Gaming Mouse", 
        category: "mice", priceUSD: 14.5, inStock: true, 
        descAr: "حساسية تصل إلى 8000 DPI مع أزرار جانبية مبرمجة ومريحة للألعاب الطويلة.", 
        descEn: "Sensitivity up to 8000 DPI with programmable side buttons and ergonomic design.",
        image: "images/mouse-rgb.png"
    },
    { 
        nameAr: "ماوس لاسلكي مريح صامت", nameEn: "Ergonomic Silent Wireless Mouse", 
        category: "mice", priceUSD: 9.0, inStock: true, 
        descAr: "نظام نقرات صامت تماماً مع بطارية تدوم طويلاً وتصميم مريح لليد للأعمال المكتبية.", 
        descEn: "Fully silent click system with long battery life, perfect for office productivity.",
        image: "images/mouse-wireless.png"
    },
    
    // ================= قسم الكيبوردات (Keyboards) =================
    { 
        nameAr: "كيبورد ميكانيكي سويتش أزرق", nameEn: "Mechanical Keyboard (Blue Switch)", 
        category: "keyboards", priceUSD: 28.0, inStock: true, 
        descAr: "لوحة مفاتيح ميكانيكية كاملة بإضاءة خلفية مقاومة للغبار مخصصة للكتابة السريعة والألعاب.", 
        descEn: "Full mechanical keyboard with RGB backlighting, dustproof, optimized for fast typing.",
        image: "images/keyboard-mechanical.png"
    },
    { 
        nameAr: "كيبورد سليم لاسلكي مدمج", nameEn: "Slim Wireless Compact Keyboard", 
        category: "keyboards", priceUSD: 16.5, inStock: true, 
        descAr: "تصميم نحيف جداً وخفيف الوزن، يدعم التوصيل عبر البلوتوث لثلاثة أجهزة معاً.", 
        descEn: "Ultra-slim and lightweight design, supports Bluetooth connection for up to 3 devices.",
        image: "images/keyboard-slim.png"
    },
    
    // ================= قسم السماعات (Headsets) =================
    { 
        nameAr: "سماعة محيطية 7.1 مع مايك مدمج", nameEn: "7.1 Surround Headset with Mic", 
        category: "headsets", priceUSD: 22.0, inStock: true, 
        descAr: "عزل صوت ممتاز ومحيطي لتحديد اتجاه الأصوات بدقة مع وسادات مريحة جداً.", 
        descEn: "Excellent surround sound isolation for accurate sound positioning with comfy ear pads.",
        image: "images/headset-71.png"
    },
    { 
        nameAr: "سماعة بلوتوث رياضية عازلة للضوضاء", nameEn: "Wireless ANC Sports Earbuds", 
        category: "headsets", priceUSD: 18.5, inStock: false, 
        descAr: "تقنية إلغاء الضوضاء النشطة (ANC) مع مقاومة للتعرق وثبات عالٍ أثناء الحركة.", 
        descEn: "Active Noise Cancellation (ANC) with sweat resistance and secure fit during movement.",
        image: "images/earbuds-anc.png"
    },
    
    // ================= قسم التخزين (Storage) =================
    { 
        nameAr: "فلاشة 64 جيجابايت USB 3.2 معدنية", nameEn: "64GB USB 3.2 Metal Flash Drive", 
        category: "storage", priceUSD: 6.5, inStock: true, 
        descAr: "سرعة نقل بيانات فائقة وهيكل معدني متين مقاوم للصدمات والماء لحماية ملفاتك.", 
        descEn: "Ultra-fast data transfer with a durable metal body resistant to shocks and water.",
        image: "images/flash-64gb.png"
    },
    { 
        nameAr: "هارد خارجي SSD سعة 512GB سريع", nameEn: "Portable External SSD 512GB", 
        category: "storage", priceUSD: 38.0, inStock: true, 
        descAr: "أداء صاروخي لتسريع نقل الملفات الكبيرة وإقلاع الألعاب، متوافق مع الموبايل والكمبيوتر.", 
        descEn: "High-speed performance for fast file transfers, compatible with mobile and PC.",
        image: "images/ssd-512gb.png"
    }
];

// ==========================================
// 2. أنيميشن ظهور العناصر عند التمرير (Scroll Reveal)
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { 
    threshold: 0.15 
});

// ==========================================
// 3. وظيفة توليد ورسم المنتجات برمجياً
// ==========================================
function renderProducts() {
    const productsMain = document.getElementById('products-main');
    if (!productsMain) return; // الخروج إذا كنا في الصفحة الرئيسية لتجنب الأخطاء

    const isEnglish = document.documentElement.lang === 'en';

    const containers = {
        'mice': document.getElementById('mice-container'),
        'keyboards': document.getElementById('keyboards-container'),
        'headsets': document.getElementById('headsets-container'),
        'storage': document.getElementById('storage-container')
    };

    // تفريغ الحاويات أولاً لمنع التكرار عند التحديث
    Object.values(containers).forEach(c => { if(c) c.innerHTML = ''; });

    productsData.forEach(product => {
        const priceSYP = (product.priceUSD * exchangeRate).toLocaleString();
        
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
                <div class="h-44 bg-gray-900/30 flex items-center justify-center border-b custom-border overflow-hidden p-4">
                    <img src="${product.image}" alt="${name}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300">
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

    // تفعيل حركات الظهور للكروت المضافة حديثاً
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
}

// تشغيل الوظائف عند اكتمال تحميل الصفحة كاملة
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // تفعيل الحركات للأقسام الثابتة في الصفحة الرئيسية
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
});

// ==========================================
// 4. ميزة تبديل الوضع (Light/Dark Mode) لجميع الصفحات
// ==========================================
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('theme-toggle-icon');
const mobileBtnToggle = document.getElementById('theme-toggle-mobile');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    if (toggleIcon) toggleIcon.innerText = '🌙';
}

function toggleTheme() {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
        if (toggleIcon) toggleIcon.innerText = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        if (toggleIcon) toggleIcon.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
if (mobileBtnToggle) mobileBtnToggle.addEventListener('click', toggleTheme);

// ==========================================
// 5. التحكم بقائمة الموبايل (Hamburger Menu)
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        }
    });
}

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