const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const path = require("path");
const fs = require("fs");

puppeteer.use(StealthPlugin);

// const html = fs.readFileSync('index.html','utf-8') // if you need to html file to pdf

// this function will save the pdf file in the public directory and then download it
// and delete the file after download
// const html_to_pdf_file = async (html, res) => {
//   const outputDir = path.basename("public");
//   const fileName = `html${Date.now()}.pdf`; // Unique file name
//   const pdfPath = path.join(outputDir, fileName);

//   // Ensure the 'public' directory exists
//   if (!fs.existsSync(outputDir)) {
//     await fs.mkdirSync(outputDir, { recursive: true });
//   }
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   try {
//     await page.setContent(html, { waitUntil: "networkidle0" }); // wait until all network request is done
//     await page.pdf({
//       path: pdfPath,
//       format: "A4",
//       printBackground: true,
//     });

//     console.log("PDF Generated Successfully!");

//     // Download the PDF
//     res.download(pdfPath, "html_to_pdf.pdf", async (err) => {
//       if (err) {
//         console.error("❌ Error during download:", err);
//         res.status(500).send("Something went wrong." + err);
//       } else {
//         console.log("✅ File sent! Now deleting...");
//         // Delete the file after sending
//         await fs.unlink(pdf, (unlinkErr) => {
//           if (unlinkErr) {
//             console.error("❌ Error deleting file:", unlinkErr);
//           } else {
//             console.log("✅ Temporary PDF deleted.");
//           }
//         });
//       }
//     });
//   } catch (err) {
//     console.log("Error to generate pdf :" + err);
//   } finally {
//     await browser.close();
//   }
// };


// Function to convert HTML to PDF without saving file
// This function will send the PDF directly in the response

/**
 * Converts HTML to PDF using Puppeteer.
 * 
 * @param {Object} options - The options for the PDF conversion.
 * @param {string} options.html - The HTML content to convert to PDF.
 * @param {Object} options.res - The response object (e.g., Express response).
 * @param {string} [options.fileName='html_to_pdf'] - The name of the generated PDF file.
 * @param {string} [options.format='A4'] - The format of the PDF ('A4', 'Letter', 'Legal').
 * @param {Object} [options.margin={top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in'}] - The margins for the PDF.
 * @param {boolean} [options.printBackground=true] - Whether to print the background in the PDF.
 * 
 * @returns {Promise<void>} - A promise that resolves once the PDF is generated.
 */
const htmlToPdf = async ({html, res, fileName='html_to_pdf', format='A4', margin={top:"0.5in",right:"0.5in",bottom:"0.5in",left:"0.5in"}, printBackground=true}) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "networkidle0" }); // wait until all network request is done
    const pdf = await page.pdf({
      format: format,
      margin: margin,
      printBackground: printBackground,
    });

    console.log("PDF Generated Successfully!");

    await res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}.pdf"`,
      "Content-Length": pdf.length,
    });

    res.send(pdf);

    // if you want to save the file, uncomment the line below
    // return pdfPath
  } catch (err) {
    console.log("Error to generate pdf :" + err);
    res.status(500).send("Something went wrong." + err);
  } finally {
    await browser.close();
  }
};


/**
 * async - [DESCRIPTION]
 * @param {[String]} {url - [DESCRIPTION]
 * @param {[String]} selector } - [DESCRIPTION]
 * @return {[html]} - [DESCRIPTION]
 */
const getPage = async(url) => {

  const browser = await puppeteer.launch({
     headless: true,
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/118.0 Safari/537.36');
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  return {page, browser};

  //   const results = await page.evaluate((selector) => {
  //   const selectData = document.querySelectorAll(selector);

  //     const data = []
  //   selectData.forEach((item) => {
  //    const img = item.querySelector('img').src;
  //   const title = item.querySelector('h5').innerText;
  //   const content = item.querySelector('p').innerText;
  //   if (title && img && content) data.push({ img, title, content });
  //   });
  //   return data;

  // },selector);
  // await browser.close();
  // return results;

}


module.exports = {
  //  html_to_pdf_file, 
  htmlToPdf,
  getPage,
};
