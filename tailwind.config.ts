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
        'bg-base': '#fff6f1',       // warm off-white, tinted toward the peach
        'bg-subtle': '#fbeae1',     // slightly deeper ground
        'bg-elevated': '#FFFFFF',
        'peach': '#ffdccf',         // brand peach
        'peach-deep': '#f7c3ac',    // peach with more body, for stripes and fills
        'greige': '#c3ada0',        // borders and muted text
        'warm-darker': '#000000',   // headings
        'warm-dark': '#4c4340',     // body text
        'warm-light': '#f2dccf',    // hairlines
        'warm-accent': '#e0c6b7',   // borders
        'accent': '#ffdccf',        // peach accent
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'system-ui', 'sans-serif'],
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
