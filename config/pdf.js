const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateRequisitionPDF = (requisition) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../pdfs/requisition_${requisition.requisitionNo}.pdf`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Add content to the PDF
        doc.fontSize(16).text(`Requisition No: ${requisition.requisitionNo}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Requisition Date: ${requisition.requisitionDate}`);
        doc.text(`Requestor: ${requisition.requestor}`);
        doc.text(`Request Type: ${requisition.requestType}`);
        doc.text(`Expense Type: ${requisition.expenseType}`);
        doc.text(`Purpose: ${requisition.purpose}`);
        doc.moveDown();
        doc.text('Items:');
        requisition.items.forEach((item, index) => {
            doc.text(`Item ${index + 1}: ${item.productDescription}, Quantity: ${item.quantity}, Total: ${item.total}`);
        });

        doc.end();

        stream.on('finish', () => {
            resolve(filePath);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = generateRequisitionPDF;