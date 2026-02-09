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
        // Legacy neutrals (kept for compatibility)
        'neutral-50': '#fafafa',
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e5e5e5',
        'neutral-400': '#a3a3a3',
        'neutral-600': '#525252',
        'neutral-800': '#262626',
        'neutral-900': '#171717',
        'cream': { DEFAULT: '#FAFAF8', dark: '#F5F4F1' },
        'charcoal': '#1A1A1A',
        'accent': '#C9B8A8',

        // New warm color palette
        'bg-base': '#FAFAFA',
        'bg-subtle': '#F5F5F5',
        'bg-elevated': '#FFFFFF',
        'warm-darker': '#5C4A3A',
        'warm-dark': '#8B7355',
        'warm-base': '#B8956A',
        'warm-light': '#D4B896',
        'warm-accent': '#E8D5B7',
        'gradient-from': '#F4E8D8',
        'gradient-via': '#E8D5C4',
        'gradient-to': '#DCC6B0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        decorative: ['var(--font-oswald)', 'sans-serif'],
        script: ['var(--font-oooh)', 'cursive'],
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
