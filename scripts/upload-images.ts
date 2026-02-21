import 'dotenv/config';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ROOT = path.resolve(__dirname, '..');
const BUCKET = 'images';

interface ImageEntry {
  file: string;
  slug: string;
  hero?: boolean;
}

// Map each image file to its project slug
const IMAGE_MAP: ImageEntry[] = [
  // PACCARI
  { file: 'paccari-product.png', slug: 'paccari', hero: true },
  { file: 'paccari-influencers.png', slug: 'paccari' },

  // taylor&taylor
  { file: 'taylor-taylor-logo.png', slug: 'taylor-taylor', hero: true },
  { file: 'taylor-taylor-card.png', slug: 'taylor-taylor' },

  // lulé (9 images)
  { file: 'lule-product-1.png', slug: 'lule', hero: true },
  { file: 'lule-product-2.png', slug: 'lule' },
  { file: 'lule-product-3.png', slug: 'lule' },
  { file: 'lule-lifestyle-1.png', slug: 'lule' },
  { file: 'lule-lifestyle-2.png', slug: 'lule' },
  { file: 'lule-lifestyle-3.png', slug: 'lule' },
  { file: 'lule-benefit-1.png', slug: 'lule' },
  { file: 'lule-benefit-2.png', slug: 'lule' },
  { file: 'lule-recipe.png', slug: 'lule' },

  // BA Restaurant Menu
  { file: 'ba-menu.png', slug: 'ba-restaurant-menu', hero: true },

  // Wedding Save-the-Date
  { file: 'wedding-save-the-date.png', slug: 'wedding-save-the-date', hero: true },

  // Engagement Party Poster
  { file: 'engagement-poster.png', slug: 'engagement-party-poster', hero: true },

  // 6del8 Photography (13 images)
  { file: '6del8-01.png', slug: '6del8-photography', hero: true },
  { file: '6del8-02.png', slug: '6del8-photography' },
  { file: '6del8-03.png', slug: '6del8-photography' },
  { file: '6del8-04.png', slug: '6del8-photography' },
  { file: '6del8-05.png', slug: '6del8-photography' },
  { file: '6del8-06.png', slug: '6del8-photography' },
  { file: '6del8-07.png', slug: '6del8-photography' },
  { file: '6del8-08.png', slug: '6del8-photography' },
  { file: '6del8-09.png', slug: '6del8-photography' },
  { file: '6del8-10.png', slug: '6del8-photography' },
  { file: '6del8-11.png', slug: '6del8-photography' },
  { file: '6del8-12.png', slug: '6del8-photography' },
  { file: '6del8-13.png', slug: '6del8-photography' },

  // PANEM Launch
  { file: 'panem-launch.png', slug: 'panem-launch', hero: true },
];

interface UploadResult {
  url: string;
  width: number;
  height: number;
  filename: string;
}

interface ProjectManifest {
  hero: string;
  images: UploadResult[];
}

async function processAndUpload(filePath: string, destPath: string): Promise<UploadResult> {
  const buffer = await sharp(filePath)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  const metadata = await sharp(buffer).metadata();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(destPath, buffer, { contentType: 'image/webp', upsert: true });

  if (error) {
    throw new Error(`Upload failed for ${destPath}: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(destPath);

  return {
    url: data.publicUrl,
    width: metadata.width!,
    height: metadata.height!,
    filename: path.basename(destPath),
  };
}

async function uploadPdf(): Promise<string> {
  const pdfPath = path.join(ROOT, 'portfolio-natalia-perez.pdf');
  if (!fs.existsSync(pdfPath)) {
    console.warn('PDF file not found, skipping: portfolio-natalia-perez.pdf');
    return '';
  }

  const buffer = fs.readFileSync(pdfPath);
  const destPath = 'documents/portfolio-natalia-perez.pdf';

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(destPath, buffer, { contentType: 'application/pdf', upsert: true });

  if (error) {
    console.error(`PDF upload failed: ${error.message}`);
    return '';
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(destPath);
  console.log(`PDF uploaded: ${data.publicUrl}`);
  return data.publicUrl;
}

async function main() {
  const manifest: Record<string, ProjectManifest> = {};

  console.log(`Processing ${IMAGE_MAP.length} images...\n`);

  for (const entry of IMAGE_MAP) {
    const filePath = path.join(ROOT, entry.file);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found, skipping: ${entry.file}`);
      continue;
    }

    const webpName = entry.file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const destPath = `projects/${entry.slug}/${webpName}`;

    try {
      console.log(`Uploading: ${entry.file} -> ${destPath}`);
      const result = await processAndUpload(filePath, destPath);

      if (!manifest[entry.slug]) {
        manifest[entry.slug] = { hero: '', images: [] };
      }

      if (entry.hero) {
        manifest[entry.slug].hero = result.url;
      }

      manifest[entry.slug].images.push(result);
    } catch (err) {
      console.error(`Failed to process ${entry.file}:`, err);
    }
  }

  // Upload PDF
  console.log('\nUploading PDF...');
  const pdfUrl = await uploadPdf();
  if (pdfUrl) {
    (manifest as any).__pdfUrl = pdfUrl;
  }

  // Write manifest
  const manifestPath = path.join(__dirname, 'image-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to: ${manifestPath}`);
  console.log(`Total projects: ${Object.keys(manifest).filter(k => k !== '__pdfUrl').length}`);
}

main().catch(console.error);
