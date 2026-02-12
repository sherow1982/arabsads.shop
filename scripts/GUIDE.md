# 🛠️ دليل السكريبتات والمهام الكبيرة

## 📋 المهام الكبيرة المتاحة

### 🚀 التحديث الشامل
```bash
npm run big-task:update-all
```
**يشمل:**
- تصنيف المنتجات
- تحسين SEO
- فئات Google
- تحديث التقييمات
- توليد Sitemap

### 🔧 إصلاح البناء
```bash
npm run big-task:fix-build
```
**يشمل:**
- إصلاح Export
- تحسين Mass-SEO
- إصلاح require
- اختبار البناء

### 📈 توليد SEO
```bash
npm run big-task:generate-seo
```
**يشمل:**
- توليد المحتوى
- SEO عماني
- صفحات Mass-SEO
- تحسين Mass-SEO

### 🧹 تنظيف المشروع
```bash
npm run big-task:cleanup-project
```
**يشمل:**
- إصلاح الصور
- إزالة placeholder
- إصلاح الفئات
- تنظيف الملفات

## 📝 نظام الهيستوري التلقائي

### حفظ الهيستوري
```bash
npm run history:auto "العنوان" "الوصف" "النتيجة" "ملف1,ملف2"
```

**مثال:**
```bash
npm run history:auto "إضافة ميزة جديدة" "تم إضافة زر اشتري الآن" "تم بنجاح" "src/pages/index.jsx,src/components/Button.jsx"
```

### عرض الهيستوري
```bash
# عرض هيستوري اليوم
type .history-memo\2026-02-12.md

# عرض جميع الملفات
dir .history-memo
```

## 🎯 أوامر سريعة

### تطوير
```bash
npm run dev              # تشغيل Development
npm run build            # بناء المشروع
npm run start            # تشغيل Production
```

### تحسينات
```bash
npm run enhance-content  # تحسين المحتوى
npm run add-buy-now      # إضافة زر اشتري الآن
npm run google-categories # فئات Google
npm run enhance-seo      # تحسين SEO
```

### إصلاحات
```bash
npm run fix:images       # إصلاح الصور
npm run fix:feed         # إصلاح Product Feed
npm run fix-dev          # إصلاح أخطاء Development
npm run fix-export       # إصلاح Export
```

### فحوصات
```bash
npm run check:cloudflare # فحص جاهزية Cloudflare
npm run monitor:large-files # مراقبة الملفات الكبيرة
npm run cleanup:check    # فحص الملفات للتنظيف
```

### نشر
```bash
npm run deploy:github    # رفع على GitHub
```

## 📊 إحصائيات المشروع

- **142 منتج** مع محتوى محسّن
- **864 صفحة** تم توليدها
- **710 صفحة SEO** متقدمة
- **50+ سكريبت** تلقائي
- **جاهز للنشر** على Cloudflare Pages

## 🔄 سير العمل المقترح

### للتطوير اليومي:
```bash
# 1. تشغيل Development
npm run dev

# 2. عند إضافة محتوى جديد
npm run big-task:update-all

# 3. حفظ الهيستوري
npm run history:auto "وصف العمل" "تفاصيل" "النتيجة" "الملفات"
```

### للنشر:
```bash
# 1. تنظيف شامل
npm run big-task:cleanup-project

# 2. فحص الجاهزية
npm run check:cloudflare

# 3. بناء المشروع
npm run build

# 4. رفع على GitHub
npm run deploy:github
```

### لحل المشاكل:
```bash
# 1. إصلاح البناء
npm run big-task:fix-build

# 2. إصلاح الصور
npm run fix:images

# 3. إصلاح Development
npm run fix-dev
```

## 📁 هيكل السكريبتات

```
scripts/
├── auto-history.js          # حفظ الهيستوري تلقائياً
├── big-tasks.js            # المهام الكبيرة
├── enhance-content.js      # تحسين المحتوى
├── add-buy-now-button.js   # زر اشتري الآن
├── google-categories.js    # فئات Google
├── enhance-seo.js          # تحسين SEO
├── fix-broken-images.js    # إصلاح الصور
├── check-cloudflare-ready.js # فحص Cloudflare
└── ... (50+ سكريبت آخر)
```

## 🎨 ميزات متقدمة

- **تنفيذ متسلسل** للمهام الكبيرة
- **معالجة الأخطاء** التلقائية
- **تقارير مفصلة** لكل مهمة
- **حفظ تلقائي** للهيستوري
- **مراقبة الأداء** والوقت
- **تنظيف تلقائي** للملفات

---

**© 2025 عماني ستور - نظام إدارة متقدم**