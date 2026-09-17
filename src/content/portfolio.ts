// Content for the single-page portfolio. Kept here rather than in
// src/messages because the site ships in English only for now; move it into
// the message files if Spanish or Dutch come back.

export const intro = {
  greeting: 'Hi there!',
  name: 'I’m Natalia Pérez',
  role: 'Brand & Communications Lead · Founder of 6 del 8',
  bio: [
    'Since 2020 I’ve run 6 del 8, my own studio for design, branding and social media content. It has taken me through brands in food, wellness, retail and events across Guatemala, El Salvador and the United States — from building an identity from zero to running the day-to-day content that keeps it alive.',
    'Right now I’m Brand & Communications Lead at Bussola, and I’m studying for a Bachelor’s Degree in Marketing at ESI — School of Management. I work where strategy and visual direction meet, because a brand that looks good but says nothing is only half finished.',
  ],
} as const;

export const capabilities = [
  'branding',
  'brand identity',
  'brand strategy',
  'graphic design',
  'content creation',
  'social media management',
  'creative direction',
  'marketing management',
  'communications',
  'event planning & design',
  'photography',
  'digital marketing',
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
  { title: 'FranklinCovey — The Leader in Me', year: '2013–20' },
  { title: 'Basic Photography Course', year: '2018' },
  { title: 'HTML & CSS Web Design', year: '2022' },
  { title: 'Fundamentals of Digital Marketing — Google', year: '2022' },
  { title: 'Digital Skills for Professionals', year: '2023' },
  { title: 'Digitize Your Business with Google Tools', year: '2023' },
  { title: 'Cybersecurity for Remote Work', year: '2023' },
  { title: 'Emotional Intelligence — ALINEA Vida y Futuro', year: '2023' },
  { title: 'Foundations of Project Management — Google / Coursera', year: '2026' },
  { title: 'Mastering Claude — Academia de IA', year: '2026' },
] as const;

export const clients = [
  { name: 'Fixr Gt / BUSSOLA', when: 'Jan 2025 – present' },
  { name: 'KA Events', when: 'Jan 2025 – present' },
  { name: 'Taylor & Taylor', when: 'Jun 2026 – present' },
  { name: 'Karay Foods', when: 'Feb 2023 – Feb 2025' },
  { name: 'Paccari Guatemala', when: 'Feb 2023 – May 2025' },
  { name: 'Flamzy Guatemala', when: 'Feb 2023 – May 2025' },
  { name: 'Lule Guatemala', when: 'Jan – May 2025' },
  { name: 'Moanne Moon', when: '2019 – 2024' },
  { name: 'Yayan Gourmet', when: '2019 – 2024' },
  { name: 'Bizniemos', when: '2019 – 2024' },
  { name: 'VidaFit SV', when: '2021 – 2023' },
] as const;

export const strengths = [
  'Proactive',
  'Positive attitude',
  'Innovative',
  'Perseverant',
  'Critical thinking',
  'Teamwork',
  'Creativity',
  'Adaptability',
  'Social media management',
] as const;
