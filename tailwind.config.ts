import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        movielegend: {
          950: '#050505',
          900: '#08080a',
          800: '#101317',
          500: '#f5b334',
          400: '#ffcd6c'
        }
      },
      boxShadow: {
        glow: '0 30px 90px rgba(245,179,52,0.18)'
      }
    }
  },
  plugins: []
};

export default config;
