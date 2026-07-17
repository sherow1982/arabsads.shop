const fs = require('fs');
const path = require('path');
const base = __dirname;

function getAllFiles(dir, exts) {
  let results = [];
  try {
    fs.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      try {
        if (fs.statSync(full).isDirectory() && !['node_modules','.next','out','.git'].includes(f)) {
          results = results.concat(getAllFiles(full, exts));
        } else if (exts.some(e => f.endsWith(e))) {
          results.push(full);
        }
      } catch(e) {}
    });
  } catch(e) {}
  return results;
}

const replacements = [
  ['عماني ستور - مخزونك في جيبك', 'إعلانات العرب الكويت'],
  ['مخزونك في جيبك', 'إعلانات العرب الكويت'],
  ['عماني ستور', 'إعلانات العرب الكويت'],
  ['سلطنة عمان', 'دولة الكويت'],
  ['لجميع مناطق السلطنة', 'لجميع مناطق الكويت'],
  ['محافظات عمان', 'محافظات الكويت'],
  ['مناطق عمان', 'مناطق الكويت'],
  ['في عمان', 'في الكويت'],
  ['لعمان', 'للكويت'],
  ['مسقط', 'الكويت العاصمة'],
  ['صلالة', 'حولي'],
  ['مسندم', 'الجهراء'],
  ['محافظة ظفار', 'محافظة الأحمدي'],
  ['المعمري', 'العنزي'],
  ['الحارثية', 'المطيري'],
  ['البلوشي', 'الرشيدي'],
  ['الشحية', 'العجمي'],
  ['الرواحي', 'الحربي'],
  ['ريال عماني', 'دينار كويتي'],
  ['ريال', 'دينار'],
  [' OMR', ' KWD'],
  ['"OMR"', '"KWD"'],
  ["'OMR'", "'KWD'"],
  ['ar_OM', 'ar_KW'],
  ['addressCountry: "OM"', 'addressCountry: "KW"'],
  ["addressCountry: 'OM'", "addressCountry: 'KW'"],
  ['country: "OM"', 'country: "KW"'],
  ["country: 'OM'", "country: 'KW'"],
  ['عمان', 'الكويت']
];

const files = [
  ...getAllFiles(path.join(base, 'src'), ['.js','.jsx','.json']),
  ...getAllFiles(path.join(base, 'scripts'), ['.js']),
  path.join(base, 'fix-sitemap.js')
];

let total = 0;
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  let n = c;
  replacements.forEach(([from, to]) => {
    while (n.includes(from)) n = n.split(from).join(to);
  });
  if (n !== c) {
    fs.writeFileSync(f, n, 'utf8');
    total++;
    console.log('Fixed: ' + path.relative(base, f));
  }
});
console.log('\nDone. Total fixed: ' + total);
