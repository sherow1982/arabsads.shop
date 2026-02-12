import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>من نحن - عماني ستور</title>
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            عماني ستور
          </h1>
          <p className="text-2xl font-bold text-accent">مخزونك في جيبك</p>
        </div>

        <div className="space-y-8">
          {/* من نحن */}
          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">من نحن</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              عماني ستور هو أحد أكبر المتاجر الإلكترونية في سلطنة عمان، نفخر بتقديم أفضل المنتجات بأعلى جودة وأفضل الأسعار لعملائنا الكرام.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              نؤمن بأن التسوق الإلكتروني يجب أن يكون سهلاً وآمناً وممتعاً، لذلك نعمل جاهدين لتوفير تجربة تسوق استثنائية لجميع عملائنا.
            </p>
          </section>

          {/* رؤيتنا */}
          <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-bold mb-6">رؤيتنا</h2>
            <p className="text-lg leading-relaxed">
              أن نكون المتجر الإلكتروني الأول والأكثر ثقة في سلطنة عمان، ونوفر لعملائنا تجربة تسوق لا مثيل لها.
            </p>
          </section>

          {/* انتشارنا */}
          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">انتشارنا الجغرافي</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              نخدم عملاءنا في <span className="font-bold text-primary text-2xl">سلطنة عمان</span> مع توصيل سريع لجميع المحافظات:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة مسقط</span>
              </div>
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة ظفار</span>
              </div>
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة مسندم</span>
              </div>
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة البريمي</span>
              </div>
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة الداخلية</span>
              </div>
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة شمال الباطنة</span>
              </div>
              <div className="flex items-center gap-3 bg-light-gray p-4 rounded-lg">
                <span className="text-3xl">🇴🇲</span>
                <span className="font-bold text-dark">محافظة جنوب الباطنة</span>
              </div>
            </div>
            <div className="mt-6 bg-accent bg-opacity-10 p-6 rounded-lg border-r-4 border-accent">
              <p className="text-gray-700 text-lg">
                <span className="font-bold text-accent">ميزة خاصة:</span> شحن مجاني لجميع الطلبات داخل سلطنة عمان!
              </p>
            </div>
          </section>

          {/* مقرنا */}
          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">مقر الإدارة</h2>
            <div className="flex items-start gap-6">
              <div className="bg-primary bg-opacity-10 p-6 rounded-full">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dark mb-3">عمان - محافظة مسقط</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  يقع مقر إدارتنا الرئيسي في محافظة مسقط بسلطنة عمان، حيث يعمل فريقنا على مدار الساعة لضمان أفضل خدمة لعملائنا.
                </p>
              </div>
            </div>
          </section>

          {/* مميزاتنا */}
          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">لماذا عماني ستور؟</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="font-bold text-xl text-dark mb-2">شحن مجاني</h3>
                <p className="text-gray-600">لجميع الطلبات بدون استثناء</p>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="font-bold text-xl text-dark mb-2">توصيل سريع</h3>
                <p className="text-gray-600">من 1 إلى 3 أيام عمل</p>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-xl text-dark mb-2">ضمان الجودة</h3>
                <p className="text-gray-600">منتجات أصلية 100%</p>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="font-bold text-xl text-dark mb-2">دفع آمن</h3>
                <p className="text-gray-600">حماية كاملة لبياناتك</p>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-5xl mb-4">🔄</div>
                <h3 className="font-bold text-xl text-dark mb-2">إرجاع سهل</h3>
                <p className="text-gray-600">14 يوم ضمان استرجاع</p>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="font-bold text-xl text-dark mb-2">دعم 24/7</h3>
                <p className="text-gray-600">فريق دعم متاح دائماً</p>
              </div>
            </div>
          </section>

          {/* تواصل معنا */}
          <section className="bg-gradient-to-r from-secondary to-primary text-white rounded-2xl shadow-card p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-lg mb-6">نحن هنا لخدمتك في أي وقت</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="mailto:sherow1982@gmail.com" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-light-gray transition">
                📧 sherow1982@gmail.com
              </a>
              <a href="https://wa.me/201110760081" target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-light-gray transition">
                📱 +201110760081
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
