const { execSync } = require('child_process');

console.log('🚀 رفع المشروع على GitHub...\n');

try {
  console.log('📦 إضافة الملفات...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('\n💾 حفظ التغييرات...');
  const message = process.argv[2] || 'Update: Enhanced content + Buy Now button + Ready for Cloudflare';
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
  
  console.log('\n☁️ رفع على GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('\n✅ تم الرفع بنجاح!');
  console.log('\n🌐 الخطوة التالية: اذهب إلى Cloudflare Pages');
  console.log('   https://dash.cloudflare.com/');
  
} catch (error) {
  console.error('\n❌ حدث خطأ:', error.message);
  console.log('\n💡 تأكد من:');
  console.log('   1. تم تسجيل الدخول لـ Git');
  console.log('   2. الريبو موجود على GitHub');
  console.log('   3. لديك صلاحيات الرفع');
}
