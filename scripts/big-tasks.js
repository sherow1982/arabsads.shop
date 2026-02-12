#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// دالة تنفيذ الأوامر مع معالجة الأخطاء
function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`✅ ${description} - تم بنجاح`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - فشل:`, error.message);
    return false;
  }
}

// دالة فحص وجود الملف
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// المهام الكبيرة المتاحة
const BIG_TASKS = {
  // مهمة التحديث الشامل
  'update-all': {
    name: 'التحديث الشامل للمشروع',
    commands: [
      { cmd: 'node scripts/categorize-products.js', desc: 'تصنيف المنتجات' },
      { cmd: 'node scripts/enhance-seo.js', desc: 'تحسين SEO' },
      { cmd: 'node scripts/google-categories.js', desc: 'فئات Google' },
      { cmd: 'node scripts/update-reviews.js', desc: 'تحديث التقييمات' },
      { cmd: 'node scripts/generate-sitemap.js', desc: 'توليد Sitemap' }
    ]
  },

  // مهمة إصلاح البناء
  'fix-build': {
    name: 'إصلاح مشاكل البناء',
    commands: [
      { cmd: 'node scripts/fix-export-error.js', desc: 'إصلاح Export' },
      { cmd: 'node scripts/enhance-mass-seo.js', desc: 'تحسين Mass-SEO' },
      { cmd: 'node scripts/fix-require-issue.js', desc: 'إصلاح require' },
      { cmd: 'npm run build', desc: 'اختبار البناء' }
    ]
  },

  // مهمة توليد SEO
  'generate-seo': {
    name: 'توليد محتوى SEO متقدم',
    commands: [
      { cmd: 'node scripts/generate-content.js', desc: 'توليد المحتوى' },
      { cmd: 'node scripts/update-oman-seo.js', desc: 'SEO عماني' },
      { cmd: 'node scripts/generate-mass-seo-pages.js', desc: 'صفحات Mass-SEO' },
      { cmd: 'node scripts/mass-seo-optimizer.js', desc: 'تحسين Mass-SEO' }
    ]
  },

  // مهمة تنظيف المشروع
  'cleanup-project': {
    name: 'تنظيف وتحسين المشروع',
    commands: [
      { cmd: 'node scripts/fix-broken-images.js', desc: 'إصلاح الصور' },
      { cmd: 'node scripts/remove-all-placeholders.js', desc: 'إزالة placeholder' },
      { cmd: 'node scripts/fix-categories.js', desc: 'إصلاح الفئات' },
      { cmd: 'node scripts/cleanup-large-files.js', desc: 'تنظيف الملفات' }
    ]
  }
};

// دالة تنفيذ مهمة كبيرة
function runBigTask(taskName) {
  const task = BIG_TASKS[taskName];
  
  if (!task) {
    console.error(`❌ مهمة غير موجودة: ${taskName}`);
    console.log('المهام المتاحة:', Object.keys(BIG_TASKS).join(', '));
    return false;
  }

  console.log(`\n🚀 بدء تنفيذ: ${task.name}`);
  console.log(`📋 عدد الخطوات: ${task.commands.length}`);
  
  const startTime = Date.now();
  let successCount = 0;
  let failCount = 0;

  // تنفيذ جميع الأوامر
  for (let i = 0; i < task.commands.length; i++) {
    const { cmd, desc } = task.commands[i];
    console.log(`\n[${i + 1}/${task.commands.length}] ${desc}`);
    
    if (runCommand(cmd, desc)) {
      successCount++;
    } else {
      failCount++;
      // الاستمرار حتى لو فشل أمر واحد
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`\n📊 نتائج المهمة: ${task.name}`);
  console.log(`✅ نجح: ${successCount}`);
  console.log(`❌ فشل: ${failCount}`);
  console.log(`⏱️ الوقت: ${duration}s`);

  // حفظ في الهيستوري
  if (fileExists('scripts/auto-history.js')) {
    const result = `نجح ${successCount} من ${task.commands.length} خطوات في ${duration}s`;
    runCommand(
      `node scripts/auto-history.js "${task.name}" "تنفيذ مهمة كبيرة" "${result}" "متعددة"`,
      'حفظ الهيستوري'
    );
  }

  return successCount > failCount;
}

// تشغيل من سطر الأوامر
if (require.main === module) {
  const taskName = process.argv[2];
  
  if (!taskName) {
    console.log('🛠️ سكريبت المهام الكبيرة');
    console.log('\nالاستخدام: node big-tasks.js <اسم_المهمة>');
    console.log('\nالمهام المتاحة:');
    
    Object.entries(BIG_TASKS).forEach(([key, task]) => {
      console.log(`  ${key}: ${task.name}`);
    });
    
    process.exit(1);
  }
  
  const success = runBigTask(taskName);
  process.exit(success ? 0 : 1);
}

module.exports = { runBigTask, BIG_TASKS };