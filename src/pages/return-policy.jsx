import Head from 'next/head';
import Link from 'next/link';

const SITE = 'https://arabsads.shop';

export default function ReturnPolicy() {
  return (
    <>
      <Head>
        <title>سياسة الإرجاع والاستبدال - إعلانات العرب الكويت | ضمان 14 يوم</title>
        <meta name="description" content="سياسة الإرجاع والاستبدال في إعلانات العرب الكويت. إرجاع مجاني خلال 14 يوماً من تاريخ الاستلام. استرداد كامل للمبلغ بدون رسوم إضافية." />
        <meta name="keywords" content="سياسة الإرجاع, استبدال المنتجات, ضمان الإرجاع, إعلانات العرب الكويت, استرداد الأموال" />
        <link rel="canonical" href={`${SITE}/return-policy`} />
        <meta property="og:title" content="سياسة الإرجاع والاستبدال - إعلانات العرب الكويت" />
        <meta property="og:description" content="إرجاع مجاني خلال 14 يوماً من تاريخ الاستلام. استرداد كامل للمبلغ." />
        <meta property="og:url" content={`${SITE}/return-policy`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_KW" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'سياسة الإرجاع والاستبدال',
          url: `${SITE}/return-policy`,
          description: 'سياسة الإرجاع والاستبدال في إعلانات العرب الكويت',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE },
              { '@type': 'ListItem', position: 2, name: 'سياسة الإرجاع', item: `${SITE}/return-policy` }
            ]
          }
        }) }} />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="breadcrumb">
          <Link href="/" className="hover:text-primary transition">الرئيسية</Link>
          <span>/</span>
          <span className="text-dark font-medium">سياسة الإرجاع</span>
        </nav>

        <h1 className="text-4xl font-bold text-dark mb-8">🔄 سياسة الإرجاع والاستبدال</h1>

        <div className="bg-white rounded-2xl shadow-card p-8 space-y-8">

          <div className="bg-green-50 border border-green-100 p-6 rounded-xl text-center">
            <div className="text-4xl font-black text-green-700 mb-2">✅ ضمان الإرجاع 14 يوم</div>
            <p className="text-gray-700 text-lg font-medium">إرجاع مجاني خلال 14 يوماً من تاريخ الاستلام</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                <span>✅</span> شروط الإرجاع
              </h2>
              <ul className="space-y-2">
                {[
                  'المنتج في حالته الأصلية وغير مستخدم',
                  'التغليف الأصلي سليم ومكتمل',
                  'جميع الملحقات والكتيبات موجودة',
                  'إيصال الشراء الأصلي',
                  'عدم وجود أي تلف أو خدوش',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                <span>💰</span> استرداد الأموال
              </h2>
              <ul className="space-y-2">
                {[
                  'خلال 7-10 أيام عمل',
                  'بنفس طريقة الدفع الأصلية',
                  'استرداد كامل للمبلغ',
                  'بدون رسوم إضافية',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">كيفية طلب الإرجاع</h2>
            <ol className="space-y-3">
              {[
                'تواصل معنا عبر واتساب أو البريد الإلكتروني',
                'أرسل رقم الطلب وسبب الإرجاع',
                'احصل على موافقة الإرجاع ورقم التفويض (RMA)',
                'أعد تغليف المنتج بشكل آمن',
                'أرسل المنتج إلى العنوان المحدد',
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-700">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-dark mb-3">⚠️ حالات لا يُقبل فيها الإرجاع</h2>
            <ul className="space-y-2">
              {[
                'المنتجات المستخدمة أو التالفة بسبب سوء الاستخدام',
                'المنتجات التي مضى عليها أكثر من 14 يوماً',
                'المنتجات التي فُقدت ملحقاتها أو تغليفها الأصلي',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-yellow-600 font-bold mt-0.5">•</span>
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
            <Link href="/shipping-policy" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              🚚 سياسة الشحن ←
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
