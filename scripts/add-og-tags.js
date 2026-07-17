const fs = require('fs');
const path = require('path');

const metaTags = `
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="إعلانات العرب الكويت">
    <meta property="og:title" content="إعلانات العرب الكويت | شحن مجاني">
    <meta property="og:description" content="أفضل متجر إلكتروني في دولة الكويت. شحن مجاني لجميع الطلبات. توصيل سريع 1-3 أيام. منتجات أصلية 100%">
    <meta property="og:image" content="https://arabsads.shop/og-image.jpg">
    <meta property="og:image:secure_url" content="https://arabsads.shop/og-image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="https://arabsads.shop">
    <meta property="og:locale" content="ar_KW">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="إعلانات العرب الكويت">
    <meta name="twitter:description" content="أفضل متجر إلكتروني في دولة الكويت. شحن مجاني لجميع الطلبات">
    <meta name="twitter:image" content="https://arabsads.shop/og-image.jpg">`;

const outDir = path.join(__dirname, '../out');
const indexPath = path.join(outDir, 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // إضافة meta tags قبل </head>
  if (!html.includes('og:image')) {
    html = html.replace('</head>', `${metaTags}\n  </head>`);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('✅ تم إضافة Open Graph meta tags إلى index.html');
  } else {
    console.log('ℹ️ Meta tags موجودة بالفعل');
  }
} else {
  console.log('❌ ملف index.html غير موجود في مجلد out');
}
