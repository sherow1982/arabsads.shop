import Head from 'next/head';

export default function ShippingPolicy() {
  return (
    <>
      <Head>
        <title>سياسة الشحن - عماني ستور</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-dark mb-8">سياسة الشحن</h1>
        
        <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">مدة التوصيل</h2>
            <p className="text-gray-700 leading-relaxed">
              نقوم بتوصيل جميع الطلبات خلال <span className="font-bold text-primary">يوم إلى 3 أيام عمل</span> من تاريخ تأكيد الطلب.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">مناطق الشحن</h2>
            <p className="text-gray-700 leading-relaxed mb-3">نقوم بالشحن إلى جميع المناطق التالية:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>جميع محافظات سلطنة عمان</li>
              <li>مسقط وصلالة ومسندم</li>
              <li>البريمي والداخلية والباطنة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">رسوم الشحن</h2>
            <div className="bg-primary bg-opacity-10 p-6 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary mb-2">🎉 شحن مجاني 🎉</div>
              <p className="text-gray-700 text-lg">لجميع الطلبات بدون استثناء</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">تتبع الشحنة</h2>
            <p className="text-gray-700 leading-relaxed">
              بعد شحن طلبك، سنرسل لك رقم تتبع عبر البريد الإلكتروني أو الرسائل النصية لتتمكن من متابعة شحنتك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">شروط التوصيل</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>يجب توفر شخص لاستلام الطلب في العنوان المحدد</li>
              <li>يرجى التأكد من صحة العنوان ورقم الهاتف</li>
              <li>في حالة عدم التواجد، سيتم التواصل معك لإعادة جدولة التوصيل</li>
              <li>يتم فحص المنتجات قبل الاستلام</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">التوصيل السريع</h2>
            <p className="text-gray-700 leading-relaxed">
              نوفر خدمة التوصيل السريع في نفس اليوم لبعض المناطق في مسقط وصلالة مجاناً.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">الطلبات الكبيرة</h2>
            <p className="text-gray-700 leading-relaxed">
              للطلبات الكبيرة أو الجملة، يرجى التواصل معنا لترتيبات خاصة للشحن والتوصيل.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">الاتصال بنا</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              لأي استفسارات حول الشحن والتوصيل:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 البريد الإلكتروني: sherow1982@gmail.com</p>
              <p>📱 الهاتف / واتساب: +201110760081</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
