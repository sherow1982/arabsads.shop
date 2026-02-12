const fs = require('fs');
const path = require('path');

const OLD_EMAIL = 'sherow1982@gmail.com';
const NEW_EMAIL = 'sherow1982@gmail.com';

const extensions = ['.js', '.jsx', '.json', '.md', '.html', '.txt', '.env'];
const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build'];

function updateEmailInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(OLD_EMAIL)) {
      content = content.replace(new RegExp(OLD_EMAIL, 'g'), NEW_EMAIL);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${filePath}`);
      return 1;
    }
  } catch (err) {
    console.error(`❌ ${filePath}: ${err.message}`);
  }
  return 0;
}

function scanDirectory(dir) {
  let count = 0;
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(item)) {
        count += scanDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (extensions.includes(ext)) {
        count += updateEmailInFile(fullPath);
      }
    }
  }
  return count;
}

console.log(`🔄 تغيير الإيميل من ${OLD_EMAIL} إلى ${NEW_EMAIL}\n`);
const updated = scanDirectory(process.cwd());
console.log(`\n✨ تم تحديث ${updated} ملف`);
