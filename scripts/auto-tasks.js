const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tasks = {
  'update-all': [
    'node scripts/fix-categories.js',
    'node scripts/enhance-seo.js',
    'node scripts/google-categories.js',
    'node scripts/update-reviews.js'
  ],
  'fix-build': [
    'node scripts/fix-export-error.js',
    'node scripts/fix-mass-seo-paths.js',
    'node scripts/fix-require-issue.js'
  ],
  'generate-seo': [
    'node scripts/generate-content.js',
    'node scripts/update-oman-seo.js',
    'node scripts/mass-seo-optimizer.js'
  ],
  'enhance-all': [
    'node scripts/enhance-content.js',
    'node scripts/add-buy-now-button.js',
    'node scripts/enhance-seo.js',
    'node scripts/update-reviews.js'
  ]
};

const taskName = process.argv[2];

if (!taskName || !tasks[taskName]) {
  console.log('❌ مهمة غير صحيحة. المهام المتاحة:');
  Object.keys(tasks).forEach(t => console.log(`  - ${t}`));
  process.exit(1);
}

console.log(`🚀 تنفيذ مهمة: ${taskName}\n`);

tasks[taskName].forEach((cmd, i) => {
  console.log(`[${i + 1}/${tasks[taskName].length}] ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ فشل: ${cmd}`);
  }
});

console.log(`\n✅ اكتملت مهمة: ${taskName}`);
