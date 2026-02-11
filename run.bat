@echo off
echo ========================================
echo    متجر إماراتي - تشغيل المشروع
echo ========================================
echo.

echo [1/2] جاري تثبيت المكتبات...
call npm install

echo.
echo [2/2] جاري تشغيل المشروع...
echo.
echo المتجر سيعمل على: http://localhost:4000
echo.
echo اضغط Ctrl+C لإيقاف المشروع
echo ========================================
echo.

call npm run dev

pause
