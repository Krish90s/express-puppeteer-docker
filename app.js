const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/generate-pdf", async (req, res) => {
  try {
    const html = "<html><body><h1>Hello, PDF!</h1></body></html>";

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf();
    await browser.close();

    res.set("Content-Type", "application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
