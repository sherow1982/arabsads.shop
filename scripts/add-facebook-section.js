const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/pages/index.jsx');

console.log('🔄 إضافة قسم الفيسبوك...');

let content = fs.readFileSync(indexPath, 'utf8');

// إضافة Facebook SDK في Head
const headImport = `import Head from 'next/head';`;
const headWithFB = `import Head from 'next/head';
import Script from 'next/script';`;

if (!content.includes('Script from')) {
  content = content.replace(headImport, headWithFB);
}

// إضافة قسم الفيسبوك قبل آخر </> في الكود
const facebookSection = `
      {/* Facebook Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">تابعنا على فيسبوك</h2>
            <p className="text-lg text-dark-3 mb-6">كن أول من يعرف بالعروض والمنتجات الجديدة</p>
            <a 
              href="https://www.facebook.com/arabads.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              تابعنا على فيسبوك
            </a>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative" style={{ minHeight: '500px' }}>
              <div 
                className="fb-page" 
                data-href="https://www.facebook.com/arabads.me/" 
                data-tabs="timeline" 
                data-width="500" 
                data-height="500" 
                data-small-header="false" 
                data-adapt-container-width="true" 
                data-hide-cover="false" 
                data-show-facepile="true"
              >
                <blockquote cite="https://www.facebook.com/arabads.me/" className="fb-xfbml-parse-ignore">
                  <a href="https://www.facebook.com/arabads.me/">Arab Ads</a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facebook SDK */}
      <Script id="facebook-sdk" strategy="afterInteractive">
        {\`
          (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v18.0";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
        \`}
      </Script>
    </>`;

// استبدال آخر </> بقسم الفيسبوك
const lastClosingTag = content.lastIndexOf('    </>');
if (lastClosingTag !== -1) {
  content = content.substring(0, lastClosingTag) + facebookSection + content.substring(lastClosingTag + 7);
}

fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ تم إضافة قسم الفيسبوك بنجاح!');
console.log('📍 الموقع: آخر الصفحة الرئيسية');
console.log('🎨 التصميم: احترافي مع زر بارز وembed كامل');
