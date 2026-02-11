import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import * as gtag from '@/lib/gtag';
import { clearCart } from '@/redux/features/cartSlice';

export default function Checkout() {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items.length > 0) {
      gtag.beginCheckout(items, total);
    }
  }, []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: 'الإمارات',
    notes: '',
    paymentMethod: 'cash'
  });

  const [shipToDifferent, setShipToDifferent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.address) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const productsText = items.map(item => 
      `${item.title} × ${item.quantity} = ${(item.salePrice * item.quantity).toFixed(2)} د.إ`
    ).join('\n');

    const templateParams = {
      customer_name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      notes: formData.notes || 'لا توجد',
      payment_method: formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي',
      products: productsText,
      total: total.toFixed(2),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      const orderId = 'ORD-' + Date.now();
      gtag.purchase(orderId, items, total);
      
      dispatch(clearCart());
      toast.success('تم إرسال طلبك بنجاح!');
      setFormData({
        firstName: '', lastName: '', phone: '', email: '', address: '', city: '', country: 'الإمارات', notes: '', paymentMethod: 'cash'
      });
    } catch (error) {
      toast.error('حدث خطأ في إرسال الطلب');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            
            {/* القسم الأيمن - النموذج */}
            <div className="lg:max-w-[670px] w-full">
              
              {/* بيانات الفواتير */}
              <div className="mt-9">
                <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
                  بيانات الفواتير
                </h2>

                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="firstName" className="block mb-2.5">
                        الاسم الأول <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="أحمد"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="lastName" className="block mb-2.5">
                        اسم العائلة <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="محمد"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="country" className="block mb-2.5">
                      الدولة / المنطقة <span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-gray-1 rounded-md border border-gray-3 text-dark-4 py-3 pl-5 pr-9 duration-200 appearance-none outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      >
                        <option value="الإمارات">الإمارات</option>
                        <option value="السعودية">السعودية</option>
                        <option value="مصر">مصر</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="address" className="block mb-2.5">
                      عنوان الشارع <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="رقم المنزل واسم الشارع"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="city" className="block mb-2.5">
                      المدينة <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2.5">
                      رقم الهاتف <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>

                  <div className="mb-5.5">
                    <label htmlFor="email" className="block mb-2.5">
                      البريد الإلكتروني <span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                  </div>
                </div>
              </div>

              {/* عنوان شحن مختلف */}
              <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
                <div
                  onClick={() => setShipToDifferent(!shipToDifferent)}
                  className="cursor-pointer flex items-center gap-2.5 font-medium text-lg text-dark py-5 px-5.5"
                >
                  الشحن إلى عنوان مختلف؟
                  <svg
                    className={`fill-current ease-out duration-200 ${shipToDifferent && 'rotate-180'}`}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.06103 7.80259C4.30813 7.51431 4.74215 7.48092 5.03044 7.72802L10.9997 12.8445L16.9689 7.72802C17.2572 7.48092 17.6912 7.51431 17.9383 7.80259C18.1854 8.09088 18.1521 8.5249 17.8638 8.772L11.4471 14.272C11.1896 14.4927 10.8097 14.4927 10.5523 14.272L4.1356 8.772C3.84731 8.5249 3.81393 8.09088 4.06103 7.80259Z"
                      fill=""
                    />
                  </svg>
                </div>

                {shipToDifferent && (
                  <div className="p-4 sm:p-8.5">
                    <div className="mb-5">
                      <label className="block mb-2.5">العنوان</label>
                      <input
                        type="text"
                        placeholder="عنوان الشحن"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ملاحظات */}
              <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <label htmlFor="notes" className="block mb-2.5">
                  ملاحظات أخرى (اختياري)
                </label>
                <textarea
                  name="notes"
                  id="notes"
                  rows={5}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="ملاحظات حول طلبك، مثل ملاحظات خاصة بالتوصيل"
                  className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                ></textarea>
              </div>
            </div>

            {/* القسم الأيسر - الطلب */}
            <div className="max-w-[455px] w-full">
              
              {/* ملخص الطلب */}
              <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                  <h3 className="font-medium text-xl text-dark">طلبك</h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                  <div className="flex items-center justify-between py-5 border-b border-gray-3">
                    <div><h4 className="font-medium text-dark">المنتج</h4></div>
                    <div><h4 className="font-medium text-dark text-right">المجموع الفرعي</h4></div>
                  </div>

                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div><p className="text-dark">{item.title} × {item.quantity}</p></div>
                      <div><p className="text-dark text-right">{(item.salePrice * item.quantity).toFixed(2)} د.إ</p></div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between py-5 border-b border-gray-3">
                    <div><p className="text-dark">رسوم الشحن</p></div>
                    <div><p className="text-dark text-right">مجاني</p></div>
                  </div>

                  <div className="flex items-center justify-between pt-5">
                    <div><p className="font-medium text-lg text-dark">الإجمالي</p></div>
                    <div><p className="font-medium text-lg text-dark text-right">{total.toFixed(2)} د.إ</p></div>
                  </div>
                </div>
              </div>

              {/* طريقة الدفع */}
              <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                  <h3 className="font-medium text-xl text-dark">طريقة الدفع</h3>
                </div>

                <div className="p-4 sm:p-8.5">
                  <div className="flex flex-col gap-3">
                    
                    <label className="flex cursor-pointer select-none items-center gap-4">
                      <div className="relative">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === 'bank'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full ${formData.paymentMethod === 'bank' ? 'border-4 border-blue' : 'border border-gray-4'}`}></div>
                      </div>
                      <div className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none ${formData.paymentMethod === 'bank' ? 'border-transparent bg-gray-2' : 'border-gray-4 shadow-1'}`}>
                        <div className="flex items-center">
                          <div className="pr-2.5">🏦</div>
                          <div className="border-l border-gray-4 pl-2.5">
                            <p>تحويل بنكي مباشر</p>
                          </div>
                        </div>
                      </div>
                    </label>

                    <label className="flex cursor-pointer select-none items-center gap-4">
                      <div className="relative">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full ${formData.paymentMethod === 'cash' ? 'border-4 border-blue' : 'border border-gray-4'}`}></div>
                      </div>
                      <div className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none min-w-[240px] ${formData.paymentMethod === 'cash' ? 'border-transparent bg-gray-2' : 'border-gray-4 shadow-1'}`}>
                        <div className="flex items-center">
                          <div className="pr-2.5">💵</div>
                          <div className="border-l border-gray-4 pl-2.5">
                            <p>الدفع عند الاستلام</p>
                          </div>
                        </div>
                      </div>
                    </label>

                  </div>
                </div>
              </div>

              {/* زر إتمام الطلب */}
              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
              >
                إتمام الطلب
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}
