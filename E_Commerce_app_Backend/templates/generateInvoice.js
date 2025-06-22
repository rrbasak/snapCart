import PDFDocument from "pdfkit";
import moment from "moment";
import axios from "axios"; // ✅ Add this
// fs and path are no longer needed, so remove them

const generateInvoice = async (order, address) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // === Fetch Cloudinary Logo ===
      try {
        const imageRes = await axios.get(
          "https://res.cloudinary.com/da9eicxue/image/upload/v1750579316/logoWithText_abfbaj.png",
          { responseType: "arraybuffer" }
        );
        const logoBuffer = Buffer.from(imageRes.data, "binary");
        doc.image(logoBuffer, 50, 30, { width: 100 });
      } catch (imageErr) {
        console.warn("Logo load failed. Continuing without it.");
      }

      // === INVOICE Title Centered ===
      doc.font("Helvetica-Bold").fontSize(20).text("INVOICE", 0, 40, {
        align: "center",
      });

      // === Order Info (Top Right) ===
      const labelX = 350;
      const valueX = 420;
      let currentY = 90;

      doc.fontSize(10);
      doc.font("Helvetica-Bold").text("Date:", labelX, currentY);
      doc
        .font("Helvetica")
        .text(moment(order.createdAt).format("LL"), valueX, currentY);
      currentY += 15;

      doc.font("Helvetica-Bold").text("Order ID:", labelX, currentY);
      doc.font("Helvetica").text(order._id, valueX, currentY);
      currentY += 15;

      doc.font("Helvetica-Bold").text("Customer:", labelX, currentY);
      doc.font("Helvetica").text(order?.buyer?.name, valueX, currentY);
      currentY += 15;

      doc.font("Helvetica-Bold").text("Email:", labelX, currentY);
      doc.font("Helvetica").text(order?.email, valueX, currentY);
      currentY += 30;

      // === Shipping Address ===
      doc.font("Helvetica-Bold").text("Shipping Address:", 50, currentY);
      doc
        .font("Helvetica")
        .fontSize(10)
        .text(address || "N/A", 50, currentY + 15);
      currentY += 40;

      // === Table Header ===
      doc.font("Helvetica-Bold").fontSize(12);
      const tableTop = currentY;
      const col1 = 50,
        col2 = 80,
        col3 = 330,
        col4 = 400,
        col5 = 470;

      doc.text("#", col1, tableTop);
      doc.text("Product", col2, tableTop);
      doc.text("Qty", col3, tableTop);
      doc.text("Price", col4, tableTop);
      doc.text("Total", col5, tableTop);
      doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      // === Table Body ===
      doc.font("Helvetica").fontSize(11);
      let total = 0;
      let y = tableTop + 25;

      order.products.forEach((item, index) => {
        const name = item.product?.name || item.productName;
        const qty = item.quantity;
        const price = item.orgprice;
        const rowTotal = qty * price;
        total += rowTotal;

        doc.text(index + 1, col1, y);
        doc.text(name, col2, y, { width: 240 });
        doc.text(qty.toString(), col3, y);
        doc.text(`Rs. ${price}`, col4, y);
        doc.text(`Rs. ${rowTotal}`, col5, y);

        y = doc.y + 10;
        doc.moveTo(50, y).lineTo(550, y).stroke();
        y += 5;
      });

      // === Grand Total ===
      const grandTotal = total;
      y += 10;
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Grand Total:", col4, y)
        .text(`Rs. ${grandTotal}`, col5, y);

      // === Footer ===
      doc
        .fontSize(10)
        .fillColor("gray")
        .text("Thank you for shopping with SnapCart!", 50, 730 - 40, {
          align: "center",
          width: 500,
        })
        .text("Support: support@snapcart.com | +91-6289756043", {
          align: "center",
          width: 500,
        });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export default generateInvoice;
