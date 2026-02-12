#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// إعدادات الهيستوري
const HISTORY_DIR = '.history-memo';
const TODAY = new Date().toISOString().split('T')[0];
const HISTORY_FILE = path.join(HISTORY_DIR, `${TODAY}.md`);

// إنشاء مجلد الهيستوري إذا لم يكن موجوداً
if (!fs.existsSync(HISTORY_DIR)) {
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
}

// دالة حفظ الهيستوري
function saveHistory(title, description, result, files = []) {
  const timestamp = new Date().toLocaleTimeString('ar-EG', { hour12: false });
  const date = new Date().toLocaleString('ar-EG');
  
  const entry = `
---

## [${timestamp}] - ${title}

### الطلب:
${description}

### النتيجة:
${result}

### الملفات المتأثرة:
${files.length > 0 ? files.map(f => `- ✅ \`${f}\``).join('\n') : '- لا توجد ملفات'}

---

**آخر تحديث:** ${date}

`;

  // إنشاء الملف إذا لم يكن موجوداً
  if (!fs.existsSync(HISTORY_FILE)) {
    const header = `# سجل المحادثات - ${TODAY}

`;
    fs.writeFileSync(HISTORY_FILE, header, 'utf8');
  }

  // إضافة الإدخال الجديد
  fs.appendFileSync(HISTORY_FILE, entry, 'utf8');
  
  console.log(`✅ تم حفظ الهيستوري: ${title}`);
  console.log(`📁 الملف: ${HISTORY_FILE}`);
}

// تشغيل من سطر الأوامر
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('الاستخدام: node auto-history.js "العنوان" "الوصف" "النتيجة" "ملف1,ملف2"');
    process.exit(1);
  }
  
  const [title, description, result = 'تم بنجاح', filesStr = ''] = args;
  const files = filesStr ? filesStr.split(',').map(f => f.trim()).filter(f => f) : [];
  
  saveHistory(title, description, result, files);
}

module.exports = { saveHistory };