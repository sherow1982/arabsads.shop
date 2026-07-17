const fs = require('fs');
const path = require('path');

const seoDir = path.join(__dirname, 'out/seo');
const files = fs.readdirSync(seoDir).filter(f => f.endsWith('.html'));

const replacements = [
  ['\u0639\u0645\u0627\u0646\u064a \u0633\u062a\u0648\u0631', '\u0625\u0639\u0644\u0627\u0646\u0627\u062a \u0627\u0644\u0639\u0631\u0628 \u0627\u0644\u0643\u0648\u064a\u062a'],
  ['\u0641\u064a \u0639\u064f\u0645\u0627\u0646', '\u0641\u064a \u0627\u0644\u0643\u0648\u064a\u062a'],
  ['\u0641\u064a \u0639\u0645\u0627\u0646', '\u0641\u064a \u0627\u0644\u0643\u0648\u064a\u062a'],
  ['\u0628\u0639\u0645\u0627\u0646', '\u0628\u0627\u0644\u0643\u0648\u064a\u062a'],
  ['\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0633\u0644\u0637\u0646\u0629', '\u0645\u062d\u0627\u0641\u0638\u0627\u062a \u0627\u0644\u0643\u0648\u064a\u062a'],
  ['\u0627\u0644\u0633\u0644\u0637\u0646\u0629', '\u0627\u0644\u0643\u0648\u064a\u062a'],
  ['\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0639\u0645\u0627\u0646\u064a\u0629', '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0643\u0648\u064a\u062a\u064a\u0629'],
  ['\u0627\u0644\u0639\u0645\u0627\u0646\u064a\u0629 \u0627\u0644\u0623\u0635\u064a\u0644\u0629', '\u0627\u0644\u0643\u0648\u064a\u062a\u064a\u0629 \u0627\u0644\u0623\u0635\u064a\u0644\u0629'],
  ['\u0627\u0644\u0639\u0645\u0627\u0646\u064a\u0629', '\u0627\u0644\u0643\u0648\u064a\u062a\u064a\u0629'],
  ['\u0627\u0644\u0639\u0645\u0627\u0646\u064a', '\u0627\u0644\u0643\u0648\u064a\u062a\u064a'],
  ['\u0639\u0645\u0627\u0646\u064a\u0629', '\u0643\u0648\u064a\u062a\u064a\u0629'],
  ['\u0639\u0645\u0627\u0646\u064a', '\u0643\u0648\u064a\u062a\u064a'],
  ['\u0645\u0633\u0642\u0637', '\u0627\u0644\u0643\u0648\u064a\u062a \u0627\u0644\u0639\u0627\u0635\u0645\u0629'],
  ['\u0635\u0644\u0627\u0644\u0629', '\u062d\u0648\u0644\u064a'],
  ['\u0631.\u0639', '\u062f.\u0643'],
  ['"OMR"', '"KWD"'],
  ['OMR', 'KWD'],
  ['ar_OM', 'ar_KW'],
  ['"addressCountry":"OM"', '"addressCountry":"KW"'],
  ['"addressCountry": "OM"', '"addressCountry": "KW"'],
];

let totalFixed = 0;
let filesFixed = 0;

for (const file of files) {
  const filePath = path.join(seoDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesFixed++;
    totalFixed++;
  }
}

console.log(`✅ تم إصلاح ${filesFixed} ملف HTML من أصل ${files.length}`);

// تحقق من ملف واحد
const sample = fs.readFileSync(path.join(seoDir, 'buy-1.html'), 'utf8');
const hasOman = sample.includes('\u0639\u0645\u0627\u0646\u064a \u0633\u062a\u0648\u0631') || 
                sample.includes('\u0641\u064a \u0639\u0645\u0627\u0646') ||
                sample.includes('\u0631.\u0639');
console.log('buy-1.html لا يزال فيه محتوى عماني:', hasOman);
