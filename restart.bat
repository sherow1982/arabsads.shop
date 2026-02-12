@echo off
echo ========================================
echo   تنظيف وإعادة تشغيل المشروع
echo ========================================
echo.

echo 🧹 إيقاف البروسس القديم...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4000') do (
    taskkill /F /PID %%a 2>nul
)

echo 🗑️ حذف مجلد .next...
if exist .next rmdir /s /q .next

echo 🚀 بدء التشغيل...
npm run dev
