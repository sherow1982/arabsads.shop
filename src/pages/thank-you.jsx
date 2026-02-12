import Link from 'next/link';
import { useEffect } from 'react';
import SEO from '@/components/SEO';

export default function ThankYou() {
  useEffect(() => {
    const confetti = () => {
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      (function frame() {
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    };
    confetti();
  }, []);

  return (
    <>
      <SEO 
        title="شكراً لك - عماني ستور"
        description="تم استلام طلبك بنجاح"
      />
      
      <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">
          
          {/* Success Icon */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-success rounded-full mb-6 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
              🎉 شكراً لك!
            </h1>
            <p className="text-xl text-dark-3">
              تم استلام طلبك بنجاح
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-100 text-success px-6 py-3 rounded-full font-bold text-lg mb-4">
                ✓ تم تأكيد الطلب
              </div>
              <p className="text-dark-3 text-lg">
                سنتواصل معك قريباً لتأكيد التفاصيل
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">📦</div>
                <h3 className="font-bold text-dark mb-1">تجهيز الطلب</h3>
                <p className="text-sm text-dark-3">خلال 24 ساعة</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-bold text-dark mb-1">شحن مجاني</h3>
                <p className="text-sm text-dark-3">لجميع محافظات عمان</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">⏱️</div>
                <h3 className="font-bold text-dark mb-1">توصيل سريع</h3>
                <p className="text-sm text-dark-3">1-3 أيام عمل</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-6">
              <p className="text-center text-dark-3 mb-4">
                لأي استفسار تواصل معنا:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/201110760081" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  واتساب
                </a>
                <a href="tel:+201110760081" 
                   className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition">
                  📱 اتصل بنا
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="flex-1 bg-primary text-white text-center py-4 px-6 rounded-xl font-bold hover:bg-primary-dark transition shadow-lg">
              متابعة التسوق
            </Link>
            <Link href="/" className="flex-1 bg-white text-primary text-center py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg border-2 border-primary">
              العودة للرئيسية
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
