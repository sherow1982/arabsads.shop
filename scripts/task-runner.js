#!/usr/bin/env node

/**
 * 🚀 سكريبت إدارة المهام الكبيرة
 * يقوم بتنفيذ المهام الثقيلة بشكل تلقائي
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ألوان للطباعة
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTask(taskName) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`🔧 ${taskName}`, 'cyan');
  log('='.repeat(60), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// المهام المتاحة
const tasks = {
  // 1. إصلاح وتوليد Product Feed
  'fix-feed': {
    name: 'إصلاح وتوليد Product Feed',
    description: 'إصلاح أخطاء XML وإعادة توليد ملف الـ feed',
    run: async () => {
      try {
        logInfo('جاري إصلاح ملف الـ feed...');
        execSync('node generate-product-feed.js', { stdio: 'inherit' });
        
        // التحقق من صحة الملف
        const feedPath = path.join(__dirname, '../public/product-feed.xml');
        const content = fs.readFileSync(feedPath, 'utf-8');
        
        if (content.includes('<?xml') && content.includes('</rss>')) {
          logSuccess('تم إصلاح وتوليد الـ feed بنجاح!');
          logInfo(`حجم الملف: ${Math.round(content.length / 1024)} KB`);
        } else {
          throw new Error('الملف غير صالح');
        }
      } catch (error) {
        logError(`فشل في إصلاح الـ feed: ${error.message}`);
        throw error;
      }
    }
  },

  // 2. تحديث الهيستوري
  'update-history': {
    name: 'تحديث سجل التطوير',
    description: 'تحديث ملف HISTORY.md بآخر التغييرات',
    run: async () => {
      try {
        logInfo('جاري تحديث سجل التطوير...');
        
        const historyPath = path.join(__dirname, '../HISTORY.md');
        const date = new Date();
        const dateStr = date.toLocaleDateString('ar-EG', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        let history = '';
        if (fs.existsSync(historyPath)) {
          history = fs.readFileSync(historyPath, 'utf-8');
        }
        
        const newEntry = `\n\n---\n\n## 📅 ${dateStr}\n\n### التحديثات:\n- تم تشغيل سكريبت المهام الكبيرة\n- آخر تحديث: ${date.toLocaleString('ar-EG')}\n`;
        
        fs.writeFileSync(historyPath, history + newEntry, 'utf-8');
        logSuccess('تم تحديث سجل التطوير بنجاح!');
      } catch (error) {
        logError(`فشل في تحديث الهيستوري: ${error.message}`);
      }
    }
  },

  // 2.5. تحسين بيانات الفيد
  'enhance-feed': {
    name: 'تحسين بيانات الفيد',
    description: 'إضافة الأسعار والصور والمخزون',
    run: async () => {
      try {
        logInfo('جاري تحسين بيانات الفيد...');
        execSync('node scripts/enhance-feed-data.js', { stdio: 'inherit' });
        logSuccess('تم تحسين البيانات بنجاح!');
      } catch (error) {
        logError(`فشل في تحسين البيانات: ${error.message}`);
      }
    }
  },

  // 3. تحسين الصور
  'optimize-images': {
    name: 'تحسين صور المنتجات',
    description: 'ضغط وتحسين جودة الصور',
    run: async () => {
      logWarning('هذه المهمة تتطلب تثبيت sharp');
      logInfo('npm install sharp --save-dev');
      logInfo('سيتم تخطي هذه المهمة حالياً');
    }
  },

  // 4. فحص المنتجات
  'validate-products': {
    name: 'فحص بيانات المنتجات',
    description: 'التحقق من صحة بيانات المنتجات',
    run: async () => {
      try {
        logInfo('جاري فحص بيانات المنتجات...');
        
        const productsPath = path.join(__dirname, '../src/data/products-data.json');
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        
        let errors = 0;
        let warnings = 0;
        
        products.forEach((product, index) => {
          // فحص الحقول المطلوبة
          if (!product.id) {
            logError(`المنتج ${index + 1}: ID مفقود`);
            errors++;
          }
          if (!product.name) {
            logError(`المنتج ${index + 1}: الاسم مفقود`);
            errors++;
          }
          if (!product.price || product.price <= 0) {
            logError(`المنتج ${index + 1}: السعر غير صحيح`);
            errors++;
          }
          if (!product.image) {
            logWarning(`المنتج ${index + 1}: الصورة مفقودة`);
            warnings++;
          }
          if (!product.description || product.description.length < 50) {
            logWarning(`المنتج ${index + 1}: الوصف قصير جداً`);
            warnings++;
          }
        });
        
        logInfo(`\nإجمالي المنتجات: ${products.length}`);
        if (errors === 0 && warnings === 0) {
          logSuccess('جميع المنتجات صحيحة! ✨');
        } else {
          if (errors > 0) logError(`عدد الأخطاء: ${errors}`);
          if (warnings > 0) logWarning(`عدد التحذيرات: ${warnings}`);
        }
      } catch (error) {
        logError(`فشل في فحص المنتجات: ${error.message}`);
      }
    }
  },

  // 5. تنظيف الملفات المؤقتة
  'clean': {
    name: 'تنظيف الملفات المؤقتة',
    description: 'حذف الملفات المؤقتة والـ cache',
    run: async () => {
      try {
        logInfo('جاري تنظيف الملفات المؤقتة...');
        
        const dirsToClean = [
          path.join(__dirname, '../.next'),
          path.join(__dirname, '../node_modules/.cache')
        ];
        
        let cleaned = 0;
        dirsToClean.forEach(dir => {
          if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            cleaned++;
            logInfo(`تم حذف: ${path.basename(dir)}`);
          }
        });
        
        if (cleaned > 0) {
          logSuccess(`تم تنظيف ${cleaned} مجلد!`);
        } else {
          logInfo('لا توجد ملفات للتنظيف');
        }
      } catch (error) {
        logError(`فشل في التنظيف: ${error.message}`);
      }
    }
  },

  // 6. تشغيل جميع المهام
  'all': {
    name: 'تشغيل جميع المهام',
    description: 'تنفيذ جميع المهام بالترتيب',
    run: async () => {
      const taskOrder = ['clean', 'validate-products', 'enhance-feed', 'fix-feed', 'update-history'];
      
      for (const taskName of taskOrder) {
        if (tasks[taskName] && taskName !== 'all') {
          logTask(tasks[taskName].name);
          await tasks[taskName].run();
        }
      }
      
      log('\n' + '='.repeat(60), 'green');
      logSuccess('تم إنجاز جميع المهام بنجاح! 🎉');
      log('='.repeat(60), 'green');
    }
  }
};

// عرض القائمة
function showMenu() {
  log('\n🚀 سكريبت إدارة المهام الكبيرة', 'cyan');
  log('='.repeat(60), 'cyan');
  log('\nالمهام المتاحة:\n', 'yellow');
  
  Object.keys(tasks).forEach((key, index) => {
    log(`  ${index + 1}. ${tasks[key].name}`, 'blue');
    log(`     ${tasks[key].description}`, 'reset');
  });
  
  log('\nالاستخدام:', 'yellow');
  log('  node scripts/task-runner.js <task-name>', 'reset');
  log('\nمثال:', 'yellow');
  log('  node scripts/task-runner.js fix-feed', 'green');
  log('  node scripts/task-runner.js all', 'green');
  log('');
}

// تشغيل المهمة
async function runTask(taskName) {
  if (!taskName) {
    showMenu();
    return;
  }
  
  const task = tasks[taskName];
  if (!task) {
    logError(`المهمة "${taskName}" غير موجودة!`);
    showMenu();
    return;
  }
  
  const startTime = Date.now();
  
  try {
    logTask(task.name);
    await task.run();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log('\n' + '='.repeat(60), 'green');
    logSuccess(`تم إنجاز المهمة في ${duration} ثانية ⚡`);
    log('='.repeat(60), 'green');
  } catch (error) {
    logError(`فشلت المهمة: ${error.message}`);
    process.exit(1);
  }
}

// تشغيل السكريبت
const taskName = process.argv[2];
runTask(taskName);
