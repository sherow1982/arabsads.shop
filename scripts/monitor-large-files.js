#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { saveHistory } = require('./auto-history');

// حد حجم الملف (بالبايت) - 1MB
const FILE_SIZE_LIMIT = 1024 * 1024;

// مجلدات للفحص
const FOLDERS_TO_CHECK = [
  'src',
  'public',
  'scripts',
  '.next'
];

// أنواع الملفات للفحص
const FILE_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx',
  '.json', '.md', '.css', '.scss',
  '.html', '.xml', '.txt'
];

// دالة فحص حجم الملف
function checkFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return {
      path: filePath,
      size: stats.size,
      sizeKB: (stats.size / 1024).toFixed(1),
      sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
      isLarge: stats.size > FILE_SIZE_LIMIT
    };
  } catch (error) {
    return null;
  }
}

// دالة فحص مجلد بشكل تكراري
function scanDirectory(dirPath, results = []) {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        // تجاهل مجلدات معينة
        if (!item.startsWith('.') || item === '.next') {
          scanDirectory(fullPath, results);
        }
      } else if (stats.isFile()) {
        const ext = path.extname(item);
        if (FILE_EXTENSIONS.includes(ext)) {
          const fileInfo = checkFileSize(fullPath);
          if (fileInfo) {
            results.push(fileInfo);
          }
        }
      }
    }
  } catch (error) {
    console.log('⚠️ خطأ في فحص:', dirPath);
  }
  
  return results;
}

// دالة إنشاء سكريبت للملف الكبير
function createBigFileScript(fileInfo) {
  const fileName = path.basename(fileInfo.path, path.extname(fileInfo.path));
  const scriptName = 'handle-' + fileName + '.js';
  const scriptPath = path.join('scripts', scriptName);
  
  const scriptContent = '#!/usr/bin/env node\n\n' +
    '// سكريبت معالجة الملف الكبير: ' + fileInfo.path + '\n' +
    '// الحجم: ' + fileInfo.sizeMB + ' MB\n\n' +
    'const fs = require(\'fs\');\n' +
    'const path = require(\'path\');\n\n' +
    'const FILE_PATH = \'' + fileInfo.path + '\';\n\n' +
    '// دالة قراءة الملف بأجزاء\n' +
    'function readFileInChunks(filePath, chunkSize = 1024 * 1024) {\n' +
    '  const chunks = [];\n' +
    '  const buffer = fs.readFileSync(filePath);\n' +
    '  \n' +
    '  for (let i = 0; i < buffer.length; i += chunkSize) {\n' +
    '    chunks.push(buffer.slice(i, i + chunkSize));\n' +
    '  }\n' +
    '  \n' +
    '  return chunks;\n' +
    '}\n\n' +
    '// دالة معالجة الملف\n' +
    'function processFile() {\n' +
    '  console.log(\'🔄 معالجة الملف الكبير:\', FILE_PATH);\n' +
    '  \n' +
    '  try {\n' +
    '    // قراءة بأجزاء\n' +
    '    const chunks = readFileInChunks(FILE_PATH);\n' +
    '    console.log(\'📊 تم تقسيم الملف إلى\', chunks.length, \'جزء\');\n' +
    '    \n' +
    '    // معالجة كل جزء\n' +
    '    chunks.forEach((chunk, index) => {\n' +
    '      console.log(\'⚡ معالجة الجزء\', index + 1, \'/\', chunks.length);\n' +
    '      // إضافة المعالجة المطلوبة هنا\n' +
    '    });\n' +
    '    \n' +
    '    console.log(\'✅ تمت معالجة الملف بنجاح\');\n' +
    '    return true;\n' +
    '  } catch (error) {\n' +
    '    console.log(\'❌ خطأ في معالجة الملف:\', error.message);\n' +
    '    return false;\n' +
    '  }\n' +
    '}\n\n' +
    '// تشغيل تلقائي\n' +
    'if (require.main === module) {\n' +
    '  processFile();\n' +
    '}\n\n' +
    'module.exports = { processFile };\n';
  
  fs.writeFileSync(scriptPath, scriptContent, 'utf8');
  console.log('📝 تم إنشاء سكريبت:', scriptPath);
  
  return scriptPath;
}

// دالة الفحص الرئيسية
function scanForLargeFiles() {
  console.log('🔍 فحص الملفات الكبيرة...');
  
  let allFiles = [];
  
  // فحص كل مجلد
  for (const folder of FOLDERS_TO_CHECK) {
    if (fs.existsSync(folder)) {
      console.log('📁 فحص مجلد:', folder);
      const files = scanDirectory(folder);
      allFiles = allFiles.concat(files);
    }
  }
  
  // ترتيب حسب الحجم
  allFiles.sort((a, b) => b.size - a.size);
  
  // الملفات الكبيرة
  const largeFiles = allFiles.filter(f => f.isLarge);
  
  console.log('\n📊 إحصائيات الفحص:');
  console.log('   📄 إجمالي الملفات:', allFiles.length);
  console.log('   🔴 ملفات كبيرة:', largeFiles.length);
  
  if (largeFiles.length > 0) {
    console.log('\n🔴 الملفات الكبيرة (أكبر من 1MB):');
    
    const createdScripts = [];
    
    largeFiles.forEach((file, index) => {
      console.log('   ' + (index + 1) + '. ' + file.path + ' (' + file.sizeMB + ' MB)');
      
      // إنشاء سكريبت للملف الكبير
      const scriptPath = createBigFileScript(file);
      createdScripts.push(scriptPath);
    });
    
    // حفظ في الهيستوري
    saveHistory(
      'فحص الملفات الكبيرة',
      'فحص ' + allFiles.length + ' ملف',
      'وجد ' + largeFiles.length + ' ملف كبير وتم إنشاء ' + createdScripts.length + ' سكريبت',
      createdScripts.join(', ')
    );
  } else {
    console.log('\n✅ لا توجد ملفات كبيرة');
  }
  
  // أكبر 10 ملفات
  console.log('\n📈 أكبر 10 ملفات:');
  allFiles.slice(0, 10).forEach((file, index) => {
    const status = file.isLarge ? '🔴' : '🟢';
    console.log('   ' + (index + 1) + '. ' + status + ' ' + file.path + ' (' + file.sizeKB + ' KB)');
  });
  
  return { total: allFiles.length, large: largeFiles.length };
}

// تشغيل تلقائي
if (require.main === module) {
  scanForLargeFiles();
}

module.exports = { scanForLargeFiles, checkFileSize };