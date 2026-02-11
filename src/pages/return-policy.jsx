import Head from 'next/head';

export default function ReturnPolicy() {
  return (
    <>
      <Head>
        <title>سياسة الإرجاع والاستبدال - متجر إماراتي</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-dark mb-8">سياسة الإرجاع والاستبدال</h1>
          
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">فترة الإرجاع</h2>
              <p className="text-gray-700 leading-relaxed">
                يمكنك إرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام. يجب أن تكون المنتجات في حالتها الأصلية مع جميع الملحقات والتغليف.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">شروط الإرجاع</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>المنتج في حالته الأصلية وغير مستخدم</li>
                <li>التغليف الأصلي سليم ومكتمل</li>
                <li>جميع الملحقات والكتيبات موجودة</li>
                <li>إيصال الشراء الأصلي</li>
                <li>عدم وجود أي تلف أو خدوش</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">المنتجات غير القابلة للإرجاع</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>المنتجات الشخصية والصحية</li>
                <li>المنتجات المخصصة أو المصنوعة حسب الطلب</li>
                <li>المنتجات المفتوحة أو المستخدمة</li>
                <li>المنتجات المخفضة أو في التصفية</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">كيفية الإرجاع</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold">لإرجاع منتج، اتبع الخطوات التالية:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>تواصل مع خدمة العملاء عبر البريد الإلكتروني أو الهاتف</li>
                  <li>قدم رقم الطلب وسبب الإرجاع</li>
                  <li>احصل على رقم تفويض الإرجاع (RMA)</li>
                  <li>أعد تغليف المنتج بشكل آمن</li>
                  <li>أرسل المنتج إلى العنوان المحدد</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الاستبدال</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                نقبل استبدال المنتجات في الحالات التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>المنتج معيب أو تالف</li>
                <li>استلام منتج خاطئ</li>
                <li>رغبة في مقاس أو لون مختلف</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">استرداد الأموال</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                بعد استلام المنتج المرتجع وفحصه:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>سيتم استرداد المبلغ خلال 7-10 أيام عمل</li>
                <li>الاسترداد يتم بنفس طريقة الدفع الأصلية</li>
                <li>رسوم الشحن غير قابلة للاسترداد</li>
                <li>العميل يتحمل تكلفة شحن الإرجاع</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">المنتجات التالفة أو المعيبة</h2>
              <p className="text-gray-700 leading-relaxed">
                إذا استلمت منتجاً تالفاً أو معيباً، يرجى التواصل معنا فوراً. سنقوم باستبدال المنتج أو استرداد المبلغ كاملاً بما في ذلك رسوم الشحن.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-dark mb-4">الاتصال بنا</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                لأي استفسارات حول سياسة الإرجاع:
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
