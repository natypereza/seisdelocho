// The eight roles behind the Background page, in the order they appear.
//
// `slug` present  -> the role gets its own full page at /background/<slug>.
// `images`        -> the two-image preview; entries without a `src` render as
//                    a labelled placeholder until the artwork arrives.
// `projects`      -> only read by the full page.

export type ExpImage = { src?: string; alt: string };

export type ExpProject = {
  title: string;
  meta?: string;
  body: string;
  bullets?: readonly string[];
  /** What still needs to be supplied before this project reads as finished. */
  awaiting?: readonly string[];
};

export type Experience = {
  n: string;
  slug?: string;
  /** Heading on the full page. Defaults to the company part of `org`. */
  pageTitle?: string;
  when: string;
  role: string;
  org: string;
  about?: string;
  didLabel: 'What I do' | 'What I did';
  did: string;
  images?: readonly ExpImage[];
  projects?: readonly ExpProject[];
  projectsNote?: string;
};

export const experiences: readonly Experience[] = [
  {
    n: '01',
    slug: 'bussola',
    when: 'Jan 2025 — Present',
    role: 'Brand & Communications Lead',
    org: 'Bussola · Guatemala',
    about:
      'Bussola is a design, construction and maintenance company focused on bringing projects from idea to execution.',
    didLabel: 'What I do',
    did: 'I’m responsible for how Bussola looks and communicates. I work across branding, content, social media, website updates, presentations and renders, while also supporting interior design, client and supplier communication, and project supervision when needed.',
    images: [
      { src: '/experience/bussola-website.jpg', alt: 'The Bussola website' },
      { alt: 'Bussola' },
    ],
    projects: [
      {
        title: 'FIXR → Bussola',
        body: 'Between late 2025 and 2026, FIXR evolved into Bussola. Starting from an initial direction for what the new brand could become, I translated the idea into a complete visual identity, developing the logo, slogan, visual direction and website.',
      },
      {
        title: 'Website',
        body: 'I developed Bussola’s website as part of the new brand identity and continue to update it as new projects are completed.',
      },
    ],
    projectsNote: 'More projects will be added as the material is selected.',
  },
  {
    n: '02',
    slug: 'panem',
    pageTitle: 'The People Behind · PANEM',
    when: 'Jun 2025 — Feb 2026',
    role: 'Brand Manager',
    org: 'The People Behind · PANEM · Guatemala City',
    about:
      'PANEM was a nightclub and entertainment venue in Guatemala City, combining music, events and curated experiences.',
    didLabel: 'What I did',
    did: 'I managed the brand across social media, content, events and experiences. My role included coordinating designers and audiovisual teams, booking and hosting DJs and artists, planning activations, and developing event concepts from the initial moodboard and visual direction through to on-site execution.',
    images: [{ alt: 'PANEM' }, { alt: 'PANEM' }],
    projects: [
      {
        title: 'Murder in the Dance Floor',
        meta: 'Halloween 2025',
        body: 'I developed the event concept and visual direction, from the initial moodboard to the decoration of different areas, experiences, activations and visual assets. I coordinated the creative briefs with designers, selected and coordinated DJs and supported the on-site execution to make sure the concept came to life as planned.',
        awaiting: [
          'Moodboard / visual concept',
          'Event graphics',
          'Decoration',
          'Activations / experiences',
          'Final event',
        ],
      },
      {
        title: 'Winter Vault',
        meta: 'Christmas 2025 · Three-day event series',
        body: 'Winter Vault was a three-day event series developed for the Christmas season. I worked on the concept, visual direction, event experience, creative coordination and execution across all three dates.',
        bullets: [
          'Thursday — Official After Party',
          'Friday — Dímelo Flow',
          'Saturday — Joey Montana',
        ],
        awaiting: ['Concept', 'Graphics', 'Venue', 'Decoration', 'Activations', 'Event photos'],
      },
    ],
  },
  {
    n: '03',
    slug: '6-del-8',
    when: '2020 — Present',
    role: 'Business Owner',
    org: '6 del 8 · Branding, Marketing & Content',
    about:
      '6 del 8 is my creative business, working with brands across different industries on marketing, branding, content and digital presence.',
    didLabel: 'What I do',
    did: 'I manage projects independently from idea to execution. Clients usually come in knowing what they need, and I help shape the direction, develop the idea and bring it to life through branding, content, social media, websites and creative work.',
    images: [{ alt: '6 del 8' }, { alt: '6 del 8' }],
    projectsNote:
      'Selected client work. Each project will carry the brand, what I worked on, a short description and its images — the clients and pieces are still being selected.',
  },
  {
    n: '04',
    slug: 'energy-foods',
    when: 'Feb 2023 — Jan 2025',
    role: 'Marketing Manager',
    org: 'Energy Foods · Guatemala City',
    about:
      'Energy Foods was an importer and distributor of health-focused food brands in Guatemala, including Paccari, Flamzy, Karay Foods and Lulë.',
    didLabel: 'What I did',
    did: 'I managed marketing across the four brands, from social media, photography and graphic design to website updates, influencer collaborations and brand activations. I also worked directly with clients and suppliers and supported the organization and production of events.',
    images: [{ alt: 'Energy Foods' }, { alt: 'Energy Foods' }],
    projects: [
      {
        title: 'Paccari × Ron Zacapa at Sublime',
        body: 'A chocolate and rum pairing experience with Paccari founder Santiago Peralta at Sublime. I supported the organization and production of the event as part of Paccari’s marketing activities in Guatemala.',
      },
      {
        title: 'Paccari × Saúl Bistro',
        body: 'An event with Santiago Peralta and a group of Guatemalan influencers. I participated in the organization, production and influencer coordination surrounding the experience.',
      },
      {
        title: 'Universidad Francisco Marroquín',
        body: 'A talk with Santiago Peralta at Universidad Francisco Marroquín. I supported the organization and marketing materials surrounding the event.',
      },
      {
        title: 'Feria Alimentaria',
        body: 'I worked on the development of the brand’s stand from scratch, taking a leading role in the concept and design while collaborating with the rest of the team to bring it to life.',
      },
      {
        title: 'Christmas Packaging',
        body: 'I designed a new seasonal packaging presentation for the Christmas period, creating a different way to present the product for the season.',
      },
    ],
    projectsNote:
      'Alongside these, the page can show social media, photography, invitations, menus, business cards, website work, influencer collaborations and brand activations.',
  },
  {
    n: '05',
    slug: 'ka-events',
    when: 'Jan 2020 — Present',
    role: 'Event Planner & Designer',
    org: 'KA Events · Guatemala City',
    about:
      'KA Events plans and designs events of all kinds, from weddings and birthdays to baby showers, first communions and seasonal installations.',
    didLabel: 'What I do',
    did: 'I work across the event process, from client meetings, moodboards and layouts to supplier coordination, timelines and on-site execution. I also create content for KA Events, photographing events and managing the visual content used across social media.',
    images: [{ alt: 'KA Events' }, { alt: 'KA Events' }],
    projectsNote:
      'A visual page rather than a written one: galleries of weddings, birthdays and celebrations, baby showers, first communions, floral design, Christmas installations, layouts and moodboards, and behind the scenes.',
  },
  {
    n: '06',
    when: 'Jun — Jul 2022',
    role: 'Internship',
    org: 'Taylor & Taylor · Virginia Beach, United States',
    about:
      'Taylor & Taylor is a compressed shapewear company specializing in post-operative garments.',
    didLabel: 'What I did',
    did: 'I supported organization, marketing and graphic design, creating materials such as business cards and improving the way product information was presented and organized.',
    images: [{ alt: 'Taylor & Taylor' }, { alt: 'Taylor & Taylor' }],
  },
  {
    n: '07',
    when: 'Oct — Dec 2020',
    role: 'Math & Physics Tutor',
    org: 'Independent · San Salvador, El Salvador',
    didLabel: 'What I did',
    did: 'I tutored a sophomore student in math and physics, preparing lessons, exercises, study materials and homework based on the topics they needed support with. The goal was simple: help them understand the material and pass their classes — which they did.',
  },
  {
    n: '08',
    when: 'Nov 2018',
    role: 'Internship',
    org: 'V Medical Spa · Guatemala City',
    didLabel: 'What I did',
    did: 'I supported the team with inventory, organization and seasonal Christmas decoration.',
  },
];

export const bySlug = (slug: string) => experiences.find((e) => e.slug === slug);
