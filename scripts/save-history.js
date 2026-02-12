const fs = require('fs');
const path = require('path');

const historyDir = path.join(process.cwd(), '.history-memo');
const today = new Date().toISOString().split('T')[0];
const historyFile = path.join(historyDir, `${today}.md`);

const newEntry = `
---

## [${new Date().toLocaleTimeString('ar-EG', { hour12: false })}] - ${process.argv[2] || 'تحديث'}

**الطلب:** ${process.argv[3] || 'تحديث عام'}
**النتيجة:** ${process.argv[4] || 'تم التنفيذ بنجاح'}
**الملفات:** ${process.argv[5] || 'متعددة'}

`;

if (!fs.existsSync(historyFile)) {
  fs.writeFileSync(historyFile, `# سجل المحادثات - ${today}\n\n${newEntry}`);
} else {
  fs.appendFileSync(historyFile, newEntry);
}

console.log(`✅ تم حفظ السجل في: ${historyFile}`);
