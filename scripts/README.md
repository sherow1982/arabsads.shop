# 🛠️ Scripts - عماني ستور

مجموعة من السكريبتات المساعدة لإدارة وصيانة المشروع

---

## 📋 قائمة السكريبتات

### 1. 🔧 `fix-feed-xml.js`
**الوظيفة:** إصلاح سريع لأخطاء XML في ملف product-feed.xml

**الاستخدام:**
\`\`\`bash
node scripts/fix-feed-xml.js
\`\`\`

**ما يقوم به:**
- إصلاح الرموز الخاصة غير المُشفّرة (`&`, `<`, `>`, `"`, `'`)
- تنظيف المسافات الزائدة
- استرجاع XML tags الصحيحة
- حفظ الملف المُصلح

**متى تستخدمه:**
- عند وجود أخطاء XML في الـ feed
- بعد تعديل يدوي على الملف
- كإصلاح سريع قبل الرفع

---

### 2. 🚀 `task-runner.js`
**الوظيفة:** سكريبت شامل لإدارة جميع المهام الكبيرة

**الاستخدام:**
\`\`\`bash
# عرض القائمة
node scripts/task-runner.js

# تشغيل مهمة واحدة
node scripts/task-runner.js <task-name>

# تشغيل جميع المهام
node scripts/task-runner.js all
\`\`\`

**المهام المتاحة:**

#### `fix-feed`
إصلاح وتوليد Product Feed
\`\`\`bash
node scripts/task-runner.js fix-feed
\`\`\`

#### `validate-products`
فحص بيانات المنتجات والتحقق من صحتها
\`\`\`bash
node scripts/task-runner.js validate-products
\`\`\`

#### `update-history`
تحديث ملف HISTORY.md بآخر التغييرات
\`\`\`bash
node scripts/task-runner.js update-history
\`\`\`

#### `optimize-images`
تحسين وضغط صور المنتجات (يتطلب sharp)
\`\`\`bash
npm install sharp --save-dev
node scripts/task-runner.js optimize-images
\`\`\`

#### `clean`
تنظيف الملفات المؤقتة والـ cache
\`\`\`bash
node scripts/task-runner.js clean
\`\`\`

#### `all`
تشغيل جميع المهام بالترتيب
\`\`\`bash
node scripts/task-runner.js all
\`\`\`

**المميزات:**
- 🎨 واجهة ملونة وواضحة
- ⚡ تنفيذ سريع ومنظم
- 📊 إحصائيات تفصيلية
- ⏱️ قياس وقت التنفيذ
- ✅ معالجة الأخطاء
- 📝 تقارير شاملة

---

## 🔄 سير العمل الموصى به

### للتطوير اليومي
\`\`\`bash
# 1. تحديث بيانات المنتجات
# تعديل src/data/products-data.json

# 2. توليد الـ feed
node generate-product-feed.js

# 3. التحقق من الصحة
node scripts/task-runner.js validate-products
\`\`\`

### قبل الرفع للإنتاج
\`\`\`bash
# تشغيل جميع المهام
node scripts/task-runner.js all
\`\`\`

### عند وجود مشاكل
\`\`\`bash
# إصلاح سريع للـ feed
node scripts/fix-feed-xml.js

# أو إعادة توليد كاملة
node scripts/task-runner.js fix-feed
\`\`\`

---

## 📊 مثال على الإخراج

\`\`\`
============================================================
🔧 إصلاح وتوليد Product Feed
============================================================
ℹ️  جاري إصلاح ملف الـ feed...

✅ تم إنشاء ملف الفييد بنجاح!
📊 عدد المنتجات: 142

✅ تم إصلاح وتوليد الـ feed بنجاح!
ℹ️  حجم الملف: 186 KB

============================================================
✅ تم إنجاز المهمة في 0.85 ثانية ⚡
============================================================
\`\`\`

---

## ⚙️ المتطلبات

### أساسية
- Node.js >= 14.0.0
- npm >= 6.0.0

### اختيارية
- sharp (لتحسين الصور)
  \`\`\`bash
  npm install sharp --save-dev
  \`\`\`

---

## 🐛 معالجة الأخطاء

### خطأ: "Permission denied"
\`\`\`bash
# على Windows، قم بإغلاق المشروع أولاً
# ثم شغل السكريبت
\`\`\`

### خطأ: "Module not found"
\`\`\`bash
# تأكد من تثبيت dependencies
npm install
\`\`\`

### خطأ: "Invalid XML"
\`\`\`bash
# استخدم سكريبت الإصلاح
node scripts/fix-feed-xml.js
\`\`\`

---

## 📝 إضافة سكريبت جديد

### 1. إنشاء الملف
\`\`\`javascript
// scripts/my-script.js
const fs = require('fs');

function myTask() {
  console.log('🚀 تشغيل المهمة...');
  // الكود هنا
  console.log('✅ تم بنجاح!');
}

myTask();
\`\`\`

### 2. إضافته لـ task-runner
\`\`\`javascript
// في scripts/task-runner.js
const tasks = {
  // ...
  'my-task': {
    name: 'اسم المهمة',
    description: 'وصف المهمة',
    run: async () => {
      // الكود هنا
    }
  }
};
\`\`\`

### 3. الاستخدام
\`\`\`bash
node scripts/task-runner.js my-task
\`\`\`

---

## 🔗 روابط مفيدة

- [Node.js Documentation](https://nodejs.org/docs/)
- [Google Merchant Center](https://merchants.google.com/)
- [XML Validation](https://www.xmlvalidation.com/)

---

## 📞 الدعم

إذا واجهت أي مشاكل:
- 📧 sherow1982@gmail.com
- 📱 +201110760081
- 💬 https://wa.me/201110760081

---

**آخر تحديث:** ${new Date().toLocaleDateString('ar-EG')}
