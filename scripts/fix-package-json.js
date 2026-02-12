const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح package.json...\n');

const packagePath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// إزالة التكرارات
const scripts = {};
Object.keys(pkg.scripts).forEach(key => {
  if (!scripts[key]) {
    scripts[key] = pkg.scripts[key];
  }
});

pkg.scripts = scripts;

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), 'utf8');

console.log('✅ تم إصلاح package.json');
console.log(`📊 عدد السكريبتات: ${Object.keys(scripts).length}`);
