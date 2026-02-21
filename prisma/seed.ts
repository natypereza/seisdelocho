import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ImageResult {
  url: string;
  width: number;
  height: number;
  filename: string;
}

interface ProjectManifest {
  hero: string;
  images: ImageResult[];
}

type Locale = 'en' | 'es' | 'nl';

interface ProjectSeed {
  slug: string;
  category: string;
  featured: boolean;
  order: number;
  translations: Record<Locale, { title: string; description: string }>;
}

const projects: ProjectSeed[] = [
  {
    slug: 'paccari',
    category: 'branding',
    featured: true,
    order: 0,
    translations: {
      en: {
        title: 'PACCARI',
        description: 'Brand identity and influencer marketing campaign for PACCARI, an award-winning organic chocolate brand from Ecuador. Developed visual content strategy and coordinated influencer collaborations to strengthen brand presence.',
      },
      es: {
        title: 'PACCARI',
        description: 'Identidad de marca y campaña de marketing con influencers para PACCARI, una marca de chocolate orgánico galardonada de Ecuador. Desarrollo de estrategia de contenido visual y coordinación de colaboraciones con influencers para fortalecer la presencia de marca.',
      },
      nl: {
        title: 'PACCARI',
        description: 'Merkidentiteit en influencer marketingcampagne voor PACCARI, een prijswinnend biologisch chocolademerk uit Ecuador. Ontwikkeling van visuele contentstrategie en coördinatie van influencer-samenwerkingen om de merkpresentie te versterken.',
      },
    },
  },
  {
    slug: 'taylor-taylor',
    category: 'branding',
    featured: false,
    order: 1,
    translations: {
      en: {
        title: 'taylor&taylor creations',
        description: 'Logo design and business card creation for taylor&taylor creations, a creative services company based in Virginia Beach, USA. Clean, modern branding reflecting their professional identity.',
      },
      es: {
        title: 'taylor&taylor creations',
        description: 'Diseño de logotipo y creación de tarjeta de presentación para taylor&taylor creations, una empresa de servicios creativos en Virginia Beach, EE.UU. Branding limpio y moderno que refleja su identidad profesional.',
      },
      nl: {
        title: 'taylor&taylor creations',
        description: 'Logo-ontwerp en visitekaartje voor taylor&taylor creations, een creatief dienstverleningsbedrijf in Virginia Beach, VS. Strak, modern branding dat hun professionele identiteit weerspiegelt.',
      },
    },
  },
  {
    slug: 'lule',
    category: 'product',
    featured: true,
    order: 2,
    translations: {
      en: {
        title: 'lulé',
        description: 'Complete product photography and visual identity for lulé, a natural wellness brand. Shot lifestyle imagery, product compositions, and benefit-focused content for social media and e-commerce platforms.',
      },
      es: {
        title: 'lulé',
        description: 'Fotografía de producto completa e identidad visual para lulé, una marca de bienestar natural. Fotografía de estilo de vida, composiciones de producto y contenido enfocado en beneficios para redes sociales y plataformas de e-commerce.',
      },
      nl: {
        title: 'lulé',
        description: 'Volledige productfotografie en visuele identiteit voor lulé, een natuurlijk wellness-merk. Lifestyle-fotografie, productcomposities en benefit-gerichte content voor social media en e-commerce platforms.',
      },
    },
  },
  {
    slug: 'ba-restaurant-menu',
    category: 'branding',
    featured: false,
    order: 3,
    translations: {
      en: {
        title: 'BA Restaurant Menu',
        description: 'Menu design for a Buenos Aires-inspired restaurant. Elegant typography and layout bringing the dining experience to life through thoughtful visual design.',
      },
      es: {
        title: 'Menú Restaurante BA',
        description: 'Diseño de menú para un restaurante inspirado en Buenos Aires. Tipografía elegante y diseño que da vida a la experiencia gastronómica a través de un diseño visual cuidado.',
      },
      nl: {
        title: 'BA Restaurant Menu',
        description: 'Menu-ontwerp voor een restaurant geïnspireerd op Buenos Aires. Elegante typografie en layout die de eetervaring tot leven brengen door doordacht visueel ontwerp.',
      },
    },
  },
  {
    slug: 'wedding-save-the-date',
    category: 'events',
    featured: false,
    order: 4,
    translations: {
      en: {
        title: 'Wedding Save-the-Date',
        description: 'Minimalist save-the-date invitation design for a wedding. Simple aesthetic with clean typography and a warm, romantic color palette.',
      },
      es: {
        title: 'Save-the-Date Boda',
        description: 'Diseño minimalista de invitación save-the-date para boda. Estética simple con tipografía limpia y una paleta de colores cálida y romántica.',
      },
      nl: {
        title: 'Trouw Save-the-Date',
        description: 'Minimalistisch save-the-date uitnodigingsontwerp voor een bruiloft. Strakke esthetiek met schone typografie en een warm, romantisch kleurenpalet.',
      },
    },
  },
  {
    slug: 'engagement-party-poster',
    category: 'events',
    featured: false,
    order: 5,
    translations: {
      en: {
        title: 'Engagement Party Poster',
        description: 'White minimalist engagement party poster design. Elegant and modern visual communication for a special celebration.',
      },
      es: {
        title: 'Póster Fiesta de Compromiso',
        description: 'Diseño de póster minimalista blanco para fiesta de compromiso. Comunicación visual elegante y moderna para una celebración especial.',
      },
      nl: {
        title: 'Verlovingsfeest Poster',
        description: 'Wit minimalistisch posterontwerp voor verlovingsfeest. Elegant en modern visueel ontwerp voor een speciale viering.',
      },
    },
  },
  {
    slug: '6del8-photography',
    category: 'photography',
    featured: true,
    order: 6,
    translations: {
      en: {
        title: '6del8 Photography',
        description: 'A curated photography series capturing moments with artistic composition and natural lighting. Personal creative work exploring visual storytelling through the lens.',
      },
      es: {
        title: '6del8 Fotografía',
        description: 'Una serie fotográfica curada que captura momentos con composición artística e iluminación natural. Trabajo creativo personal explorando la narrativa visual a través del lente.',
      },
      nl: {
        title: '6del8 Fotografie',
        description: 'Een gecureerde fotoserie die momenten vastlegt met artistieke compositie en natuurlijk licht. Persoonlijk creatief werk dat visuele verhalen vertelt door de lens.',
      },
    },
  },
  {
    slug: 'panem-launch',
    category: 'marketing',
    featured: false,
    order: 7,
    translations: {
      en: {
        title: 'PANEM Launch',
        description: 'Product launch visual campaign for PANEM. Creative direction and shot composition for the brand launch, capturing the essence of the product with impactful photography.',
      },
      es: {
        title: 'Lanzamiento PANEM',
        description: 'Campaña visual de lanzamiento de producto para PANEM. Dirección creativa y composición fotográfica para el lanzamiento de marca, capturando la esencia del producto con fotografía de impacto.',
      },
      nl: {
        title: 'PANEM Lancering',
        description: 'Visuele productlanceringscampagne voor PANEM. Creatieve regie en fotocompositie voor de merklancering, die de essentie van het product vastlegt met impactvolle fotografie.',
      },
    },
  },
];

async function main() {
  const manifestPath = path.join(__dirname, '..', 'scripts', 'image-manifest.json');

  let manifest: Record<string, ProjectManifest> = {};
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    console.log('Loaded image manifest');
  } else {
    console.warn('No image manifest found. Projects will be created without images.');
    console.warn('Run "npx tsx scripts/upload-images.ts" first to generate the manifest.');
  }

  // Clear existing data
  console.log('Clearing existing projects and images...');
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();

  const locales: Locale[] = ['en', 'es', 'nl'];

  for (const proj of projects) {
    const projectImages = manifest[proj.slug];

    for (const locale of locales) {
      const t = proj.translations[locale];
      const heroUrl = projectImages?.hero || '';

      const created = await prisma.project.create({
        data: {
          slug: proj.slug,
          title: t.title,
          description: t.description,
          imageUrl: heroUrl,
          category: proj.category,
          locale,
          order: proj.order,
          featured: proj.featured,
          ...(projectImages?.images?.length
            ? {
                images: {
                  create: projectImages.images.map((img, i) => ({
                    url: img.url,
                    altText: `${t.title} - Image ${i + 1}`,
                    width: img.width,
                    height: img.height,
                    order: i,
                  })),
                },
              }
            : {}),
        },
      });

      console.log(`Created: ${created.title} [${locale}] (${proj.category})`);
    }
  }

  const count = await prisma.project.count();
  console.log(`\nDone! ${count} projects created.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
