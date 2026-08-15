import sharp from 'sharp';

const inputPath = 'C:\\Users\\joaov\\Documents\\Repositórios-GitHub\\velnox-ia\\src\\images\\velox.ia_logo.png';
const outputPath = 'C:\\Users\\joaov\\Desktop\\velox.ia_logo.png';

const SCALE = 2;

async function upscaleImage() {
  const metadata = await sharp(inputPath).metadata();
  const newWidth = metadata.width * SCALE;
  const newHeight = metadata.height * SCALE;

  console.log(
    `📸 ${metadata.width}x${metadata.height} (${metadata.isPalette ? 'paleta 256 cores' : 'cor real'}) → ${newWidth}x${newHeight} (cor real 24-bit + alpha)`
  );

  await sharp(inputPath)
    // paleta -> RGBA de cor real, para que o gradiente deixe de ter bandas
    .ensureAlpha()
    .toColorspace('srgb')
    // suaviza o ruído de quantização (dithering) da paleta antes de ampliar
    .median(3)
    .resize(newWidth, newHeight, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill',
      fastShrinkOnLoad: false
    })
    // devolve nitidez às bordas do logotipo sem criar halos
    .sharpen({ sigma: 1.2, m1: 0.6, m2: 2.5, x1: 2, y2: 10, y3: 15 })
    .png({
      palette: false,
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true
    })
    .toFile(outputPath);

  const out = await sharp(outputPath).metadata();
  console.log(`✅ Salvo em ${outputPath} — ${out.width}x${out.height}, ${out.channels} canais, paleta: ${out.isPalette}`);
}

upscaleImage().catch((error) => {
  console.error('❌ Erro:', error.message);
  process.exit(1);
});
