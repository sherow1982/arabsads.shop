const fs = require('fs');
const path = require('path');

console.log('🔍 فحص جاهزية المشروع لـ Cloudflare Pages...\n');

const checks = {
  '✅ next.config.js': false,
  '✅ output: export': false,
  '✅ .gitignore': false,
  '✅ مجلد out': false,
  '✅ package.json': false,
  '✅ البناء ناجح': false
};

// 1. فحص next.config.js
const configPath = path.join(process.cwd(), 'next.config.js');
if (fs.existsSync(configPath)) {
  checks['✅ next.config.js'] = true;
  const config = fs.readFileSync(configPath, 'utf8');
  if (config.includes("output: 'export'")) {
    checks['✅ output: export'] = true;
  }
}

// 2. فحص .gitignore
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (fs.existsSync(gitignorePath)) {
  checks['✅ .gitignore'] = true;
}

// 3. فحص مجلد out
const outPath = path.join(process.cwd(), 'out');
if (fs.existsSync(outPath)) {
  checks['✅ مجلد out'] = true;
  const files = fs.readdirSync(outPath);
  if (files.length > 0) {
    checks['✅ البناء ناجح'] = true;
  }
}

// 4. فحص package.json
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  checks['✅ package.json'] = true;
}

// عرض النتائج
console.log('📋 نتائج الفحص:\n');
Object.entries(checks).forEach(([key, value]) => {
  console.log(`${value ? '✅' : '❌'} ${key.replace('✅ ', '')}`);
});

const allPassed = Object.values(checks).every(v => v);

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('🎉 المشروع جاهز 100% للرفع على Cloudflare Pages!');
  console.log('\n📝 خطوات الرفع:');
  console.log('1. git add .');
  console.log('2. git commit -m "Ready for Cloudflare Pages"');
  console.log('3. git push origin main');
  console.log('\n🌐 إعدادات Cloudflare Pages:');
  console.log('   Framework: Next.js');
  console.log('   Build command: npm run build');
  console.log('   Build output: out');
  console.log('   Node version: 18');
} else {
  console.log('⚠️ المشروع يحتاج بعض التعديلات');
}
console.log('='.repeat(50));
