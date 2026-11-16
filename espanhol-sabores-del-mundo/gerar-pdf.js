// Gera os PDFs a partir dos arquivos HTML desta pasta.
// Uso: node gerar-pdf.js   (precisa do Playwright instalado)
const path = require('path');
const { chromium } = require('playwright');

const arquivos = ['revista', 'roteiro-oral'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const nome of arquivos) {
    const html = path.join(__dirname, `${nome}.html`);
    await page.goto('file://' + html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(__dirname, `${nome}.pdf`),
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`OK: ${nome}.pdf`);
  }
  await browser.close();
})();
