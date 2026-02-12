@echo off
echo ========================================
echo   رفع المشروع إلى GitHub بالقوة
echo ========================================
echo.

REM التحقق من وجود git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git غير مثبت!
    pause
    exit /b 1
)

echo 📦 تهيئة Git...
if not exist .git (
    git init
)

echo 📝 إضافة جميع الملفات...
git add .

echo 💾 إنشاء Commit...
git commit -m "Update: WoodMart theme colors + Email update + SEO optimization"

echo 🔗 إضافة Remote...
git remote remove origin 2>nul
git remote add origin https://github.com/sherow1982/omany-makhzoon.git

echo 🚀 رفع المشروع بالقوة...
git push -u origin main --force

if errorlevel 1 (
    echo.
    echo ⚠️ فشل الرفع على main، محاولة master...
    git branch -M main
    git push -u origin main --force
)

echo.
echo ✅ تم رفع المشروع بنجاح!
echo 🌐 https://github.com/sherow1982/omany-makhzoon
echo.
pause
