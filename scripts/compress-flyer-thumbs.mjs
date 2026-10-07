import { createCanvas, loadImage } from "@napi-rs/canvas";
import { readdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const thumbsDir = path.join(__dirname, "..", "public", "flyer", "thumbs");

const TARGET_WIDTH = 640;

for (const file of readdirSync(thumbsDir)) {
  if (!file.endsWith(".png")) continue;
  const srcPath = path.join(thumbsDir, file);
  const img = await loadImage(readFileSync(srcPath));
  const scale = TARGET_WIDTH / img.width;
  const width = TARGET_WIDTH;
  const height = Math.round(img.height * scale);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  const outName = file.replace(/\.png$/, ".webp");
  const buffer = canvas.toBuffer("image/webp", 82);
  writeFileSync(path.join(thumbsDir, outName), buffer);
  unlinkSync(srcPath);
  console.log(`✓ ${file} -> ${outName} (${width}x${height}, ${(buffer.length / 1024).toFixed(0)} KB)`);
}

console.log("done");
