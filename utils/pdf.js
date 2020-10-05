const logo = require("../utils/logo");
module.exports = ({
  name,
  ename,
  testDate,
  flightDate,
  flightTime,
  phoneNumber,
  passportNumber,
  destination,
  airlines,
  user,
  QRCode,
  paymentStatus,
  order,
}) => {
  return `
  <!DOCTYPE html>
  <html dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>طلب فحص كرونا</title>

    <style> 
      .invoice-box {
        max-width: 900px;
        margin: auto;
        padding: 30px;
        font-size: 12px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
      }

p{
         font-size: 12px;
        line-height: 24px;

}

 img { position: absolute;
  right: 150px;
  buttom: 100px;}

.header-part{
    display: flex; 
    justify-content: space-between; 
    max-width: 900px ;
     margin: auto;
        font-size: 14px;
        line-height: 10px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
}

.titles {
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    font-size: 12px;
    line-height: 10px;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
}

      .invoice-box table {
        width: 100%;
        line-height: 10px;
        text-align: left;
      }

      .invoice-box table td {
        padding: 20px;
        text-align: right;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 12px;
        line-height: 10px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }

        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }

      /** RTL **/
      .rtl {
        direction: rtl;
        font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
          sans-serif;
      }

      .rtl table {
        text-align: right;
      }

      .rtl table tr td:nth-child(2) {
        text-align: right;
      }

      .signature {
          display: flex;
          justify-content: center;
          align-items: center;
          align-items: center;
          max-width: 400px ;
     margin-top: 5px;
        font-size: 12px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
      }
    </style>
  </head>

      <div class="header-part">
        <img src=${logo} style="width: 100%; max-width: 100px; position: absolute;
  left: 0px;
  top: 0px;"></img>
</div>
  <body dir="rtl">
  <div class="titles" >
  <div style="font-size: 20px; text-align: center;">
    <h4> معامل تست للتحاليل الطبية</h4>
  </div>
  <div style="text-align: center; font-size: 14px;">
  <h6>طلب فحص الكرونا COVID-19 </h6>
  <h6>تاريخ الطباعة ${new Date().toLocaleDateString()}</h6>
  </div>
  </div>
  <div class="invoice-box" dir="rtl">
  <table cellpadding="0" cellspacing="0">
   <tr class="heading">
          <td>
             الإسم:     <span>
                     ${name}  
                     </span>
          </td>
        </tr>
        <tr class="heading" style="text-align: left;">
          <td>
             Name:      <span>
                     ${ename}
                     </span>
          </td>
        </tr>
  </table>
  </div>
    <div class="invoice-box" dir="rtl">
      <table cellpadding="0" cellspacing="0">
          <tr class="item">
          <td>
            رقم الجواز
          </td>

          <td>
            ${passportNumber}
          </td>

           <td>
            رقم الهاتف
          </td>

          <td>
            ${phoneNumber}
          </td>

        </tr>

        <tr class="item">
          <td>
           الخطوط 
          </td>

          <td>
            ${airlines}
          </td>

           <td>
            وجهة السفر
          </td>

          <td>
            ${destination}
          </td>

        </tr>

       <tr class="item">
        <td>
           تاريخ السفر
          </td>

          <td>
            ${new Date(flightDate).toLocaleDateString()}
          </td>
          <td>
           تاريخ الفحص
          </td>

          <td>
            ${new Date(testDate).toLocaleDateString()}
          </td>
        </tr>

        <tr class="item" >
        <td>
            زمن الحضور
          </td>

          <td>
            ${flightTime}
          </td>
         <td>
           الوكالة 
         </td>
        <td>
            ${user.name}
        </td>
        </tr>
      </table>

      <div class="signature">
      <div>
       <h4>
         للاستفسار: 0912501150 - 0912501159         
         </h4> 
           <h4>
          الموقع: الخرطوم - الخرطوم (2) شرق سوق نمرة 2
مبني رقم (58) جوار مطعم بيتزا كورنر.           
         </h4>
          <h4>
          الموقع على خرائط قوقل: 
          https://maps.app.goo.gl/sBjhNzs3b9gKDyri9           
         </h4>
         <h4>
           حالة السداد: 
         ${paymentStatus}           
         </h4>
<h4>
            الرقم التسلسلي: 
         ${order}           
         </h4>
      </div>
      </div>
      <div>
      <img src=${QRCode} style="width: 100%; max-width: 100px; height: 100%; max-height: 100px; position: absolute;
  left: 0px;
  bottom: 0px; "/>
      </div>
    </div>
  </body>
</html>

    `;
};
