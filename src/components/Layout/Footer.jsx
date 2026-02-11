import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success('شكراً لاشتراكك! سنرسل لك أحدث العروض قريباً 🎉');
    e.target.reset();
  };

  return (
    <footer className="bg-secondary text-white">
      {/* Newsletter */}
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2 text-white">اشترك في نشرتنا الإخبارية</h3>
          <p className="mb-4 opacity-90 text-white">احصل على أحدث العروض والمنتجات</p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              required 
              placeholder="بريدك الإلكتروني" 
              className="flex-1 px-4 py-3 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-accent" 
            />
            <button type="submit" className="bg-secondary text-white px-6 py-3 rounded-md font-bold hover:bg-secondary-dark transition">
              اشتراك
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">إماراتي ستور</h3>
              <p className="text-gray-300 mb-2 font-bold text-accent">مخزونك في جيبك</p>
              <p className="text-gray-300 mb-4">أفضل متجر إلكتروني في 7 دول عربية</p>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  sherow1982@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  +201110760081
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-primary transition">الرئيسية</Link></li>
                <li><Link href="/shop" className="text-gray-300 hover:text-primary transition">المتجر</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-primary transition">من نحن</Link></li>
                <li><Link href="/cart" className="text-gray-300 hover:text-primary transition">السلة</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">خدمة العملاء</h4>
              <ul className="space-y-2">
                <li><Link href="/shipping-policy" className="text-gray-300 hover:text-primary transition">سياسة الشحن</Link></li>
                <li><Link href="/return-policy" className="text-gray-300 hover:text-primary transition">سياسة الإرجاع</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-primary transition">الشروط والأحكام</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-primary transition">سياسة الخصوصية</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">مميزات المتجر</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  شحن مجاني
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  توصيل سريع
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  دفع آمن
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2024 إماراتي ستور. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
