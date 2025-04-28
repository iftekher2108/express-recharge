const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// const html = fs.readFileSync('index.html','utf-8') // if you need to html file to pdf

// this function will save the pdf file in the public directory and then download it
// and delete the file after download
const html_to_pdf_file = async (html, res) => {
  const outputDir = path.basename("public");
  const fileName = `html${Date.now()}.pdf`; // Unique file name
  const pdfPath = path.join(outputDir, fileName);

  // Ensure the 'public' directory exists
  if (!fs.existsSync(outputDir)) {
    await fs.mkdirSync(outputDir, { recursive: true });
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "networkidle0" }); // wait until all network request is done
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    console.log("PDF Generated Successfully!");

    // Download the PDF
    res.download(pdfPath, "html_to_pdf.pdf", async (err) => {
      if (err) {
        console.error("❌ Error during download:", err);
        res.status(500).send("Something went wrong." + err);
      } else {
        console.log("✅ File sent! Now deleting...");
        // Delete the file after sending
        await fs.unlink(pdf, (unlinkErr) => {
          if (unlinkErr) {
            console.error("❌ Error deleting file:", unlinkErr);
          } else {
            console.log("✅ Temporary PDF deleted.");
          }
        });
      }
    });
  } catch (err) {
    console.log("Error to generate pdf :" + err);
  } finally {
    await browser.close();
  }
};


// Function to convert HTML to PDF without saving file
// This function will send the PDF directly in the response
const html_to_pdf = async (html, res) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "networkidle0" }); // wait until all network request is done
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    console.log("PDF Generated Successfully!");

   await res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="html_to_pdf.pdf"',
      "Content-Length": pdf.length,
    });

    res.send(pdf);

    // if you want to save the file, uncomment the line below
    // return pdfPath
  } catch (err) {
    console.log("Error to generate pdf :" + err);
  } finally {
    await browser.close();
  }
};

module.exports = { html_to_pdf_file, html_to_pdf };
