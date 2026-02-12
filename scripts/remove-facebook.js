const fs = require('fs');
const path = require('path');

console.log('🗑️  إزالة الفيسبوك من السكريبتات...\n');

// حذف سكريبت add-facebook-section.js
const facebookScript = path.join(__dirname, 'add-facebook-section.js');
if (fs.existsSync(facebookScript)) {
  fs.unlinkSync(facebookScript);
  console.log('✅ تم حذف add-facebook-section.js');
}

// حذف سكريبت save-facebook-history.js
const facebookHistory = path.join(__dirname, 'save-facebook-history.js');
if (fs.existsSync(facebookHistory)) {
  fs.unlinkSync(facebookHistory);
  console.log('✅ تم حذف save-facebook-history.js');
}

// تحديث package.json
const packagePath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

if (packageJson.scripts['add-facebook']) {
  delete packageJson.scripts['add-facebook'];
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log('✅ تم حذف أمر add-facebook من package.json');
}

console.log('\n🎉 تم إزالة الفيسبوك بنجاح!');
