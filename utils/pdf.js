module.exports = ({
  name,
  testDate,
  passport,
  travelDate,
  country,
  agency,
}) => {
  return `
  <!DOCTYPE html>
  <html dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>فاتورة حجز</title>

    <style> 
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
      }

p{
         font-size: 20px;
        line-height: 24px;

}

 img { position: absolute;
  left: 0px;
  top: 0px;}

.header-part{
    display: flex; 
    justify-content: space-between; 
    max-width: 800px ;
     margin: auto;
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
}
      .invoice-box table {
        width: 100%;
        line-height: inherit;
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
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 40px;
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
          max-width: 800px ;
     margin-top: 100px;
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
      }
    </style>
  </head>

  <body dir="rtl">
      <div class="header-part">
        <p>معامل تست</p>
        <p>${agency}</p>
<img src="../logo.jpg" style="width: 100%; max-width: 300px;" />
    <div class="invoice-box" dir="rtl">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td>
                  بسم الله الرحمن الرحيم <br />
                  فاتورة حجز
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading">
          <td>
            الإسم
          </td>

          <td>
            ${name}
          </td>
        </tr>

          <tr class="item">
          <td>
            رقم الجواز
          </td>

          <td>
            ${passport}
          </td>
        </tr>

        <tr class="item">
          <td>
            الدولة
          </td>

          <td>
            ${country}
          </td>
        </tr>

       <tr class="item">
          <td>
           تاريخ السفر
          </td>

          <td>
            ${travelDate}
          </td>
        </tr>

       <tr class="item">
          <td>
           تاريخ الفحص
          </td>

          <td>
            ${testDate} جنيه
          </td>
        </tr>

      </table>

      <div class="signature">
          للاتصال: 0912501150 - 0912501159
      </div>
    </div>
  </body>
</html>

    `;
};
