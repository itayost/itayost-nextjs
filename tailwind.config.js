// Tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette
        'black': '#000000',
        'white': '#FFFFFF',
        'gray': {
          100: '#F5F5F5',
          300: '#D4D4D4', 
          500: '#737373',
          700: '#404040',
          900: '#171717',
        },
        // NEW Cyan Accent (replacing orange)
        'cyan': {
          400: '#00D9FF',  // Main accent
          500: '#00B8D4',  // Mesh structures
          600: '#00E5FF',  // Glow effects
          700: '#0097A7',  // Darker variant
        },
      },
      fontFamily: {
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'hebrew': ['Heebo', 'Rubik', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'mega': 'clamp(4rem, 12vw, 10rem)',
        'display': 'clamp(3rem, 8vw, 6rem)',
        'title': 'clamp(2rem, 5vw, 3.5rem)',
        'body': 'clamp(1rem, 2vw, 1.125rem)',
        'caption': '0.875rem',
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '2rem',
        'lg': '4rem',
        'xl': '8rem',
        '2xl': '16rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
