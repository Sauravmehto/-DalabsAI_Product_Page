import { pdfToPng } from "pdf-to-png-converter";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const flyerDir = path.join(root, "public", "flyer");
const outDir = path.join(flyerDir, "thumbs");
mkdirSync(outDir, { recursive: true });

const files = [
  "FINAL_Flyer_Darker.pdf",
  "ECOMMERCE_Flyer_Darker.pdf",
  "FINTECH_Flyer_Darker.pdf",
  "PAYMENTS_Flyer_Darker.pdf",
  "RETAIL_Flyer_Darker.pdf",
  "HOSPITALITY_Flyer_Darker.pdf",
  "LOGISTICS_Flyer_Darker.pdf",
];

for (const file of files) {
  const data = readFileSync(path.join(flyerDir, file));
  const pages = await pdfToPng(data, {
    pagesToProcess: [1],
    viewportScale: 1.5,
  });

  const outName = file.replace(/_Flyer_Darker\.pdf$/i, "").toLowerCase() + ".png";
  writeFileSync(path.join(outDir, outName), pages[0].content);
  console.log(`✓ ${file} -> thumbs/${outName}`);
}

console.log("done");
