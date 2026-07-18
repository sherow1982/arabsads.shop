import Head from 'next/head';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>اتصل بنا - إعلانات العرب الكويت</title>
        <meta name="description" content="تواصل مع إعلانات العرب الكويت عبر البريد الإلكتروني أو واتساب أو الهاتف. نحن هنا لمساعدتك." />
        <link rel="canonical" href="https://arabsads.shop/contact" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-dark mb-3">اتصل بنا</h1>
          <p className="text-gray-500 text-lg">نحن هنا لمساعدتك في أي وقت</p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a href="mailto:sherow1982@gmail.com"
            className="bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-lg transition group">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
              <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <h3 className="font-bold text-dark mb-1">البريد الإلكتروني</h3>
            <p className="text-blue-600 text-sm font-medium">sherow1982@gmail.com</p>
          </a>

          <a href="https://wa.me/201110760081" target="_blank" rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-lg transition group">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition">
              <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 className="font-bold text-dark mb-1">واتساب</h3>
            <p className="text-green-600 text-sm font-medium">+201110760081</p>
          </a>

          <a href="tel:+201110760081"
            className="bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-lg transition group">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
              <svg className="w-7 h-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
            </div>
            <h3 className="font-bold text-dark mb-1">الهاتف</h3>
            <p className="text-purple-600 text-sm font-medium">+201110760081</p>
          </a>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          <h2 className="text-xl font-bold text-dark mb-6 pb-4 border-b border-gray-100">معلومات الشركة</h2>
          <div className="space-y-5 text-gray-600">
            <div className="flex gap-4">
              <span className="text-2xl flex-shrink-0">🏢</span>
              <div>
                <p className="font-bold text-dark text-sm mb-1">اسم العلامة التجارية</p>
                <p>إعلانات العرب الكويت — علامة تجارية مملوكة ومُدارة من قِبل Arab Ads</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl flex-shrink-0">📍</span>
              <div>
                <p className="font-bold text-dark text-sm mb-1">العنوان المسجل</p>
                <p>مبنى 69، شقة 3، الحي الأول، المنطقة السادسة، مدينة 6 أكتوبر، الجيزة، مصر</p>
                <p className="text-sm text-gray-400 mt-1">ص.ب: 12566</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl flex-shrink-0">🧾</span>
              <div>
                <p className="font-bold text-dark text-sm mb-1">الرقم الضريبي</p>
                <p>657-989-878</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl flex-shrink-0">✉️</span>
              <div>
                <p className="font-bold text-dark text-sm mb-1">البريد الإلكتروني</p>
                <a href="mailto:sherow1982@gmail.com" className="text-primary hover:underline">sherow1982@gmail.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl flex-shrink-0">📞</span>
              <div>
                <p className="font-bold text-dark text-sm mb-1">الهاتف / واتساب</p>
                <a href="tel:+201110760081" className="text-primary hover:underline">+201110760081</a>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary hover:underline font-medium">← العودة للرئيسية</Link>
        </div>
      </div>
    </>
  );
}
