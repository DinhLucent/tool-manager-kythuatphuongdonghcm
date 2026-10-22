import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Cascadia Mono', 'Consolas', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        clinical: {
          navy: '#07384e',
          dark: '#04283d',
          deep: '#031e2d',
          border: '#0b405f',
          accent: '#0b6fae',
          accentHover: '#095f95',
          light: '#eaf3ff',
          success: '#16803c',
          successLight: '#ecf8e9',
          warning: '#d97706',
          warningLight: '#fff4e5',
          danger: '#c62828',
          dangerLight: '#fdeaea',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
};

export default config;
