// Content for the single-page portfolio. Kept here rather than in
// src/messages because the site ships in English only for now; move it into
// the message files if Spanish or Dutch come back.

export const intro = {
  greeting: 'Hi there!',
  name: 'I’m Natalia Pérez',
  bio: [
    'I’m a creative person who loves turning ideas into something real. I’ve always enjoyed design and marketing, but what I love most is understanding the whole picture — the people behind a brand, what they want to communicate, their goals, their values, and how all of those pieces can come together.',
    'I started 6 del 8 in 2020 by helping people around me with their businesses. What began as something I genuinely enjoyed quickly became an opportunity to work with very different brands across food, wellness, retail, events and more. And that’s probably my favorite part: no two brands are the same. I like getting to know each one, thinking outside the box, and finding the best way to bring their ideas to life.',
    'Outside of work, I’m someone who really values the people around me, good food, traveling, learning new things and finding inspiration everywhere. I’m curious by nature, I like being involved, and whether I’m working on a brand, an event or a completely new idea, I’m happiest when I can understand it, build it and actually make it happen.',
  ],
} as const;

export const capabilities = [
  'Brand Strategy',
  'Brand Identity',
  'Creative Direction',
  'Content & Social Media',
  'Marketing & Communications',
  'Events & Experiences',
] as const;

export const education = [
  {
    when: 'Currently enrolled',
    what: 'Bachelor’s Degree in Marketing',
    where: 'ESI — School of Management',
  },
  {
    when: 'Graduated 2020',
    what: 'High School Diploma in Science & Humanities',
    where: 'Valle Verde School · Guatemala',
  },
] as const;

export const experience = [
  { when: 'Jan 2025 – present', what: 'Brand & Communications Lead', where: 'Bussola' },
  {
    when: 'Jun 2025 – Feb 2026',
    what: 'Brand Manager',
    where: 'The People Behind · PANEM Cub · Guatemala City',
  },
  {
    when: '2020 – present',
    what: 'Business Owner',
    where: '6 del 8 · Design, branding & social media content',
  },
  { when: 'Feb 2023 – Jan 2025', what: 'Marketing Manager', where: 'Energy Foods · Guatemala City' },
  {
    when: 'Jan 2020 – present',
    what: 'Event Planner & Designer',
    where: 'KA Events · Guatemala City',
  },
  {
    when: 'Jun – Jul 2022',
    what: 'Internship',
    where: 'Taylor & Taylor · Virginia Beach, United States',
  },
  {
    when: 'Oct – Dec 2020',
    what: 'Math & Physics Tutor',
    where: 'Independent · San Salvador, El Salvador',
  },
  { when: 'Internship', what: 'V Medical Spa', where: 'Guatemala City, Guatemala' },
] as const;

export const tools: ReadonlyArray<{ name: string; note?: string }> = [
  { name: 'Adobe Photoshop' },
  { name: 'Canva' },
  { name: 'CapCut' },
  { name: 'Microsoft Office' },
  { name: 'Google Chrome' },
  { name: 'Claude', note: 'AI' },
  { name: 'ChatGPT', note: 'AI' },
  { name: 'Photography' },
];

// level is out of 5, taken from the levels stated on the CV.
export const languages = [
  { name: 'Spanish', note: 'Native', level: 5 },
  { name: 'English', note: 'Fluent', level: 5 },
  { name: 'Dutch', note: 'A1 — currently learning', level: 1 },
] as const;

export const certifications = [
  // Newest first, ordered by the year each one finished.
  { title: 'Mastering Claude — Academia de IA', year: '2026' },
  { title: 'Foundations of Project Management — Google / Coursera', year: '2026' },
  { title: 'Emotional Intelligence — ALINEA Vida y Futuro', year: '2023' },
  { title: 'Cybersecurity for Remote Work', year: '2023' },
  { title: 'Digitize Your Business with Google Tools', year: '2023' },
  { title: 'Digital Skills for Professionals', year: '2023' },
  { title: 'Fundamentals of Digital Marketing — Google', year: '2022' },
  { title: 'HTML & CSS Web Design', year: '2022' },
  { title: 'FranklinCovey — The Leader in Me', year: '2013–20' },
  { title: 'Basic Photography Course', year: '2018' },
] as const;

// `cover` is the designed client card in public/clients. The card already
// carries the brand name and the dates, so the page shows it on its own.
export type Client = { name: string; when: string; cover?: string };

export const clients: ReadonlyArray<Client> = [
  { name: 'Fixr Gt / BUSSOLA', when: 'Jan 2025 – present', cover: '/clients/fixr-bussola.webp' },
  { name: 'KA Events', when: 'Jan 2025 – present', cover: '/clients/ka-events.webp' },
  { name: 'Taylor & Taylor', when: 'Jun 2026 – present', cover: '/clients/taylor-taylor.webp' },
  { name: 'Karay Foods', when: 'Feb 2023 – Feb 2025', cover: '/clients/karay-foods.webp' },
  { name: 'Paccari Guatemala', when: 'Feb 2023 – May 2025', cover: '/clients/paccari.webp' },
  { name: 'Flamzy Guatemala', when: 'Feb 2023 – May 2025', cover: '/clients/flamzy.webp' },
  { name: 'Lule Guatemala', when: 'Jan – May 2025', cover: '/clients/lule.webp' },
  { name: 'Moanne Moon', when: '2019 – 2024', cover: '/clients/moanne-moon.webp' },
  { name: 'Yayan Gourmet', when: '2019 – 2024', cover: '/clients/yayan-gourmet.webp' },
  { name: 'Bizniemos', when: '2019 – 2024', cover: '/clients/bizniemos.webp' },
  { name: 'VidaFit SV', when: '2021 – 2023', cover: '/clients/vidafit.webp' },
];

/* The camera strip: the title is on the screen, and the note takes its
   place while the camera is hovered or tapped. */
export const strengths = [
  { title: 'Creative thinking', note: 'Finding ideas beyond the obvious.' },
  { title: 'Problem solving', note: 'Finding a way forward when things don’t go as planned.' },
  { title: 'Adaptability', note: 'Adjusting quickly to different brands, people and challenges.' },
  { title: 'Critical thinking', note: 'Looking at the bigger picture before making decisions.' },
  { title: 'Curiosity', note: 'Always asking, learning and looking a little deeper.' },
  { title: 'Ownership', note: 'Taking responsibility and making sure things actually happen.' },
] as const;
