import Head from 'next/head';
import Link from 'next/link';

const SITE = 'https://arabsads.shop';

export default function ShippingPolicy() {
  return (
    <>
      <Head>
        <title>سياسة الشحن والتوصيل - إعلانات العرب الكويت | شحن مجاني</title>
        <meta name="description" content="سياسة الشحن والتوصيل في إعلانات العرب الكويت. شحن مجاني لجميع مناطق الكويت خلال 1-3 أيام عمل. توصيل سريع وآمن لجميع المحافظات." />
        <meta name="keywords" content="سياسة الشحن, توصيل الكويت, شحن مجاني, إعلانات العرب, توصيل سريع" />
        <link rel="canonical" href={`${SITE}/shipping-policy`} />
        <meta property="og:title" content="سياسة الشحن والتوصيل - إعلانات العرب الكويت" />
        <meta property="og:description" content="شحن مجاني لجميع مناطق الكويت خلال 1-3 أيام عمل." />
        <meta property="og:url" content={`${SITE}/shipping-policy`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_KW" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'سياسة الشحن والتوصيل',
          url: `${SITE}/shipping-policy`,
          description: 'سياسة الشحن والتوصيل في إعلانات العرب الكويت',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'سياسة الشحن', item: `${SITE}/shipping-policy` }
            ]
          }
        }) }} />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="breadcrumb">
          <Link href="/" className="hover:text-primary transition">الرئيسية</Link>
          <span>/</span>
          <span className="text-dark font-medium">سياسة الشحن</span>
        </nav>

        <h1 className="text-4xl font-bold text-dark mb-8">🚚 سياسة الشحن والتوصيل</h1>

        <div className="bg-white rounded-2xl shadow-card p-8 space-y-8">

          <div className="bg-primary bg-opacity-10 p-6 rounded-xl text-center">
            <div className="text-4xl font-black text-primary mb-2">🎉 شحن مجاني 100%</div>
            <p className="text-gray-700 text-lg font-medium">لجميع الطلبات داخل دولة الكويت بدون حد أدنى</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '⏱️', title: 'مدة التوصيل', desc: '1 إلى 3 أيام عمل من تأكيد الطلب' },
              { icon: '📍', title: 'مناطق التوصيل', desc: 'جميع محافظات الكويت الست' },
              { icon: '📦', title: 'تتبع الشحنة', desc: 'رقم تتبع عبر واتساب أو SMS' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">المحافظات المشمولة بالتوصيل</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['العاصمة', 'حولي', 'الفروانية', 'الأحمدي', 'الجهراء', 'مبارك الكبير'].map(gov => (
                <div key={gov} className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <span className="font-medium text-gray-700">{gov}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">شروط التوصيل</h2>
            <ul className="space-y-3">
              {[
                'يجب توفر شخص لاستلام الطلب في العنوان المحدد',
                'يرجى التأكد من صحة العنوان ورقم الهاتف',
                'في حالة عدم التواجد، سيتم التواصل معك لإعادة جدولة التوصيل',
                'يتم فحص المنتجات قبل الاستلام',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-dark mb-3">📞 تواصل معنا</h2>
            <div className="space-y-2 text-gray-700">
              <p>📧 البريد الإلكتروني: info@arabsads.shop</p>
              <p>📱 واتساب: <a href="https://wa.me/201110760081" className="text-primary hover:underline font-medium">+201110760081</a></p>
            </div>
          </section>

          <div className="flex gap-4 pt-2">
            <Link href="/return-policy" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              🔄 سياسة الإرجاع ←
            </Link>
            <Link href="/shop" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              🛍️ تسوق الآن ←
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
