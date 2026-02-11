import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { formData, items, total } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const productsHTML = items.map(item => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.title}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.salePrice} د.إ</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${(item.salePrice * item.quantity).toFixed(2)} د.إ</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `طلب جديد من ${formData.firstName} ${formData.lastName}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>طلب جديد من متجر إماراتي</h2>
        
        <h3>بيانات العميل:</h3>
        <p><strong>الاسم:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>الهاتف:</strong> ${formData.phone}</p>
        <p><strong>البريد:</strong> ${formData.email}</p>
        <p><strong>العنوان:</strong> ${formData.address}</p>
        <p><strong>المدينة:</strong> ${formData.city}</p>
        <p><strong>الدولة:</strong> ${formData.country}</p>
        ${formData.notes ? `<p><strong>ملاحظات:</strong> ${formData.notes}</p>` : ''}
        <p><strong>طريقة الدفع:</strong> ${formData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}</p>
        
        <h3>المنتجات:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; border: 1px solid #ddd;">المنتج</th>
              <th style="padding: 10px; border: 1px solid #ddd;">الكمية</th>
              <th style="padding: 10px; border: 1px solid #ddd;">السعر</th>
              <th style="padding: 10px; border: 1px solid #ddd;">المجموع</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>
        
        <h3 style="margin-top: 20px;">الإجمالي: ${total.toFixed(2)} د.إ</h3>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
