#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { saveHistory } = require('./auto-history');

// مجلدات للتنظيف
const CLEANUP_FOLDERS = [
  '.next',
  'node_modules',
  'out'
];

// ملفات مؤقتة للحذف
const TEMP_FILES = [
  'temp_files.txt',
  '*.tmp',
  '*.log',
  '.DS_Store',
  'Thumbs.db'
];

// دالة حساب حجم المجلد
function getFolderSize(folderPath) {
  let totalSize = 0;
  
  try {
    const items = fs.readdirSync(folderPath);
    
    for (const item of items) {
      const fullPath = path.join(folderPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        totalSize += getFolderSize(fullPath);
      } else {
        totalSize += stats.size;
      }
    }
  } catch (error) {
    // تجاهل الأخطاء
  }
  
  return totalSize;
}

// دالة تنسيق الحجم
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// دالة حذف مجلد
function deleteFolder(folderPath) {
  try {
    if (fs.existsSync(folderPath)) {
      const sizeBefore = getFolderSize(folderPath);
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log('🗑️ تم حذف:', folderPath, '(' + formatSize(sizeBefore) + ')');
      return sizeBefore;
    }
  } catch (error) {
    console.log('❌ خطأ في حذف:', folderPath, error.message);
  }
  return 0;
}

// دالة التنظيف الرئيسية
function cleanupLargeFiles() {
  console.log('🧹 بدء تنظيف الملفات الكبيرة...');
  
  let totalCleaned = 0;
  const cleanedItems = [];
  
  // حذف مجلدات البناء
  for (const folder of CLEANUP_FOLDERS) {
    if (fs.existsSync(folder)) {
      const size = deleteFolder(folder);
      if (size > 0) {
        totalCleaned += size;
        cleanedItems.push(folder);
      }
    }
  }
  
  // حذف الملفات المؤقتة
  try {
    const tempFile = 'src/temp_files.txt';
    if (fs.existsSync(tempFile)) {
      const stats = fs.statSync(tempFile);
      fs.unlinkSync(tempFile);
      totalCleaned += stats.size;
      cleanedItems.push(tempFile);
      console.log('🗑️ تم حذف:', tempFile, '(' + formatSize(stats.size) + ')');
    }
  } catch (error) {
    // تجاهل
  }
  
  // حذف سكريبتات المعالجة المولدة
  try {
    const scriptsDir = 'scripts';
    const files = fs.readdirSync(scriptsDir);
    
    for (const file of files) {
      if (file.startsWith('handle-') && file.endsWith('.js')) {
        const filePath = path.join(scriptsDir, file);
        const stats = fs.statSync(filePath);
        fs.unlinkSync(filePath);
        totalCleaned += stats.size;
        cleanedItems.push(filePath);
        console.log('🗑️ تم حذف سكريبت:', filePath);
      }
    }
  } catch (error) {
    // تجاهل
  }
  
  console.log('\n📊 نتائج التنظيف:');
  console.log('   🗑️ إجمالي المحذوف:', formatSize(totalCleaned));
  console.log('   📁 عدد العناصر:', cleanedItems.length);
  
  if (cleanedItems.length > 0) {
    console.log('\n📋 العناصر المحذوفة:');
    cleanedItems.forEach((item, index) => {
      console.log('   ' + (index + 1) + '. ' + item);
    });
  }
  
  // حفظ في الهيستوري
  saveHistory(
    'تنظيف الملفات الكبيرة',
    'حذف ' + cleanedItems.length + ' عنصر',
    'تم توفير ' + formatSize(totalCleaned) + ' من المساحة',
    cleanedItems.join(', ')
  );
  
  console.log('\n✅ تم التنظيف بنجاح!');
  console.log('💡 لإعادة البناء: npm run build');
  
  return { totalCleaned, cleanedItems };
}

// دالة فحص المساحة
function checkDiskSpace() {
  console.log('💾 فحص استخدام المساحة...');
  
  const folders = ['.next', 'node_modules', 'out', 'src', 'public', 'scripts'];
  
  folders.forEach(folder => {
    if (fs.existsSync(folder)) {
      const size = getFolderSize(folder);
      console.log('   📁 ' + folder + ': ' + formatSize(size));
    }
  });
}

// تشغيل تلقائي
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'check') {
    checkDiskSpace();
  } else if (command === 'clean') {
    cleanupLargeFiles();
  } else {
    console.log('🧹 أداة تنظيف الملفات الكبيرة');
    console.log('\nالأوامر المتاحة:');
    console.log('  node cleanup-large-files.js check  - فحص المساحة');
    console.log('  node cleanup-large-files.js clean  - تنظيف الملفات');
    console.log('\nأو استخدم:');
    console.log('  npm run cleanup:check');
    console.log('  npm run cleanup:clean');
  }
}

module.exports = { cleanupLargeFiles, checkDiskSpace };