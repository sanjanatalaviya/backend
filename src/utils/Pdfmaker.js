const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {
    // console.log(__dirname);
    // const image = require('../../../../../fullstackProject/backend/e-commerce/public/temp/1718256395901-32046276-download.jpg');
    // console.log(image);
    const docDefinition = {
        content: [
            {
                image: '../../../../../fullstackProject/backend/e-commerce/public/temp/1718256395901-32046276-download.jpg',
                // fit: [100, 100],
                width: 100,
                // pageBreak: 'after'
                margin: [0, 0, 0, 20],
            },
            { text: 'Invoice', style: 'subheader', margin: [0, 0, 0, 20], alignment: 'center', fontSize: '20' },
            { text: 'Name: Sanjana Talaviya', margin: [0, 0, 0, 10] },
            { text: 'Email: sanjanatalaviya@gmail.com', margin: [0, 0, 0, 10] },
            { text: 'Phone: 123456789', margin: [0, 0, 0, 10] },
            { text: 'Address: Surat', margin: [0, 0, 0, 20] },
            // {
            //     style: 'tableExample',
            //     table: {
            //         heights: [20, 50, 70],
            //         body: [
            //             ['Name', 'Sanjana Talaviya'],
            //             ['Address', 'surat'],
            //             ['email', 'sanjanatalaviya@gmail.com'],
            //             ['Phone No.', '98765 43210']
            //         ]
            //     },
            // margin: [0, 0, 0, 20],
            // },
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Sr No', 'Item', 'Quantity', 'Price', 'Total Price'],
                        ['1', 'Samsung S23', '1', '50,000', '50,000'],
                        ['2', 'Cover', '2', '1000', '2000'],
                        [{ text: 'Total Amount', colSpan: 4 }, '', '', '', '52,000']
                    ]
                }
            },
        ]
    };

    const outputPath = path.join(__dirname, "../../../../../fullstackProject/backend/e-commerce/public/document.pdf");
    // const path = require('../../../../../fullstackProject/backend/e-commerce/public/document.pdf');
    // console.log(path);

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;