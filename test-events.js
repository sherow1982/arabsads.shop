// اختبار Enhanced Ecommerce Events
// افتح Console في المتصفح والصق هذا الكود

console.log('🔍 فحص Google Analytics Events...\n');

// 1. تحقق من وجود gtag
if (typeof window.gtag !== 'undefined') {
  console.log('✅ gtag موجود');
} else {
  console.log('❌ gtag غير موجود - تحقق من Google Analytics ID');
}

// 2. تحقق من dataLayer
if (typeof window.dataLayer !== 'undefined') {
  console.log('✅ dataLayer موجود');
  console.log('📊 عدد الأحداث:', window.dataLayer.length);
} else {
  console.log('❌ dataLayer غير موجود');
}

// 3. اختبار الأحداث يدوياً
console.log('\n🧪 اختبار الأحداث:\n');

// اختبار View Item
console.log('1️⃣ اختبار View Item Event...');
if (window.gtag) {
  window.gtag('event', 'view_item', {
    currency: 'AED',
    value: 100,
    items: [{
      item_id: 'test_1',
      item_name: 'Test Product',
      price: 100
    }]
  });
  console.log('✅ تم إرسال view_item');
}

// اختبار Add to Cart
console.log('2️⃣ اختبار Add to Cart Event...');
if (window.gtag) {
  window.gtag('event', 'add_to_cart', {
    currency: 'AED',
    value: 100,
    items: [{
      item_id: 'test_1',
      item_name: 'Test Product',
      price: 100,
      quantity: 1
    }]
  });
  console.log('✅ تم إرسال add_to_cart');
}

// اختبار Purchase
console.log('3️⃣ اختبار Purchase Event...');
if (window.gtag) {
  window.gtag('event', 'purchase', {
    transaction_id: 'TEST_' + Date.now(),
    value: 100,
    currency: 'AED',
    items: [{
      item_id: 'test_1',
      item_name: 'Test Product',
      price: 100,
      quantity: 1
    }]
  });
  console.log('✅ تم إرسال purchase');
}

console.log('\n✅ انتهى الاختبار - تحقق من Google Analytics Realtime');
console.log('📍 اذهب إلى: https://analytics.google.com → Realtime → Events');
