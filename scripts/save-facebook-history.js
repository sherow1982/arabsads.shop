const fs = require('fs');
const path = require('path');

const historyDir = path.join(__dirname, '../.history-memo');
const today = new Date().toISOString().split('T')[0];
const historyFile = path.join(historyDir, `${today}.md`);

const time = new Date().toLocaleTimeString('ar-EG', { hour12: false });
const date = new Date().toLocaleString('ar-EG');

const entry = `

---

## [${time}] - إضافة صفحة الفيسبوك بشكل بارز

### الطلب:
- قراءة الهيستوري والاستمرار
- إضافة صفحة الفيسبوك https://www.facebook.com/arabads.me/ بشكل بارز
- عمل embed احترافي في آخر الصفحة الرئيسية
- إنشاء سكريبت للمهام الكبيرة

### الإجراءات المنفذة:

#### 1. سكريبت إضافة الفيسبوك (\`scripts/add-facebook-section.js\`):
**الميزات:**
- زر بارز بأيقونة فيسبوك
- تصميم احترافي بألوان فيسبوك الرسمية
- Facebook Page Plugin كامل
- تحميل Facebook SDK تلقائياً
- responsive design لجميع الأجهزة

#### 2. القسم المضاف:
**المكونات:**
- 📱 **زر متابعة بارز** - أزرق بأيقونة فيسبوك
- 📊 **Facebook Page Embed** - عرض Timeline كامل
- 🎨 **تصميم احترافي** - gradient background + shadow
- 📱 **متجاوب** - يعمل على جميع الأجهزة
- ⚡ **SDK تلقائي** - تحميل Facebook SDK

#### 3. الملفات المحدثة:
- ✅ \`scripts/add-facebook-section.js\` - سكريبت الإضافة
- ✅ \`src/pages/index.jsx\` - إضافة القسم
- ✅ \`package.json\` - أمر جديد

#### 4. الأمر الجديد:
\`\`\`bash
npm run add-facebook  # إضافة قسم الفيسبوك
\`\`\`

### النتيجة:
- ✅ **قسم فيسبوك بارز** في آخر الصفحة الرئيسية
- ✅ **زر متابعة** بتصميم احترافي
- ✅ **Facebook Page Plugin** يعرض آخر المنشورات
- ✅ **SDK تلقائي** - لا حاجة لإعدادات إضافية
- ✅ **تصميم متجاوب** - يعمل على الموبايل والديسكتوب

### مميزات القسم:
\`\`\`
✓ زر بارز بألوان فيسبوك الرسمية
✓ أيقونة فيسبوك احترافية
✓ عنوان جذاب "تابعنا على فيسبوك"
✓ وصف تحفيزي
✓ Facebook Page Plugin كامل (500px height)
✓ عرض Timeline + Facepile
✓ تصميم بطاقة أبيض مع ظل
✓ Gradient background (أزرق فاتح)
✓ Facebook SDK بالعربية (ar_AR)
\`\`\`

### الموقع:
- 📍 **آخر الصفحة الرئيسية** - قبل Footer مباشرة
- 🎯 **بارز جداً** - لا يمكن تفويته
- 📱 **متجاوب** - يتكيف مع حجم الشاشة

### ملاحظات:
- السكريبت يعمل تلقائياً
- يمكن تشغيله يدوياً في أي وقت
- Facebook SDK يتم تحميله بعد تحميل الصفحة (afterInteractive)
- الـ embed يعرض آخر المنشورات تلقائياً
- يمكن للزوار التفاعل مع المنشورات مباشرة

---

**آخر تحديث:** ${date}
`;

if (fs.existsSync(historyFile)) {
  fs.appendFileSync(historyFile, entry, 'utf8');
} else {
  const header = `# سجل المحادثات - ${today}\n`;
  fs.writeFileSync(historyFile, header + entry, 'utf8');
}

console.log('✅ تم حفظ الهيستوري بنجاح!');
console.log(`📁 الملف: ${historyFile}`);
