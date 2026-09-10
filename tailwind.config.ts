import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        'bg-base': '#f0efea',       // cloud dancer - main base
        'bg-subtle': '#e8e7e2',     // slightly darker base
        'bg-elevated': '#FFFFFF',
        'peach': '#ffdccf',         // soft peach - accent
        'greige': '#BFB8AE',        // structure
        'warm-darker': '#5C4A3A',   // dark text
        'warm-dark': '#7A6B5D',     // body text
        'warm-light': '#D4C8BC',    // light accents
        'warm-accent': '#BFB8AE',   // same as greige for borders
        'accent': '#ffdccf',        // peach accent
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        decorative: ['var(--font-playfair)', 'Georgia', 'serif'],
        script: ['var(--font-moontime)', 'cursive'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['2rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
      },
      spacing: {
        'section': '8rem',
      },
      maxWidth: {
        'content': '1200px',
        'content-xl': '1400px',
        'content-2xl': '1600px',
        'prose': '700px',
      },
    },
  },
  plugins: [],
};

export default config;
