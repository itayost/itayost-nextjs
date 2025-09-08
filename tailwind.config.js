
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern color palette
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4', 
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        // Modern cyan accent
        cyan: {
          50: '#E6FFFA',
          100: '#B2FEF7',
          200: '#80F4E6',
          300: '#4DE5D5',
          400: '#1AD1C3',
          DEFAULT: '#00D9FF',
          500: '#00D9FF',
          600: '#00B8D4',
          700: '#0097A7',
          800: '#00758F',
          900: '#005470',
        },
        // Semantic colors
        accent: {
          primary: '#00D9FF',
          secondary: '#00B8D4',
          light: '#E6FFFA',
          dark: '#0097A7',
        }
      },
      fontFamily: {
        // Modern font stack
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Courier New', 'monospace'],
        // Hebrew fonts
        hebrew: ['Heebo', 'Rubik', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Modern type scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',    // 4px
        DEFAULT: '0.5rem',   // 8px
        'md': '0.75rem',     // 12px
        'lg': '1rem',        // 16px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        'full': '9999px',
      },
      animation: {
        // Smooth modern animations
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-down': 'fade-down 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-down': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        // Modern gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cyan': 'linear-gradient(135deg, #00D9FF 0%, #00B8D4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #171717 0%, #000000 100%)',
        'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
        'gradient-mesh': 'linear-gradient(135deg, #00D9FF 0%, #00B8D4 50%, #0097A7 100%)',
        // Patterns
        'grid-pattern': `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
        'dot-pattern': `radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    // RTL Support Plugin
    function({ addUtilities, addVariant }) {
      // Logical properties utilities
      addUtilities({
        '.ps-0': { paddingInlineStart: '0' },
        '.ps-1': { paddingInlineStart: '0.25rem' },
        '.ps-2': { paddingInlineStart: '0.5rem' },
        '.ps-4': { paddingInlineStart: '1rem' },
        '.ps-8': { paddingInlineStart: '2rem' },
        '.pe-0': { paddingInlineEnd: '0' },
        '.pe-1': { paddingInlineEnd: '0.25rem' },
        '.pe-2': { paddingInlineEnd: '0.5rem' },
        '.pe-4': { paddingInlineEnd: '1rem' },
        '.pe-8': { paddingInlineEnd: '2rem' },
        '.ms-0': { marginInlineStart: '0' },
        '.ms-2': { marginInlineStart: '0.5rem' },
        '.ms-4': { marginInlineStart: '1rem' },
        '.ms-8': { marginInlineStart: '2rem' },
        '.ms-auto': { marginInlineStart: 'auto' },
        '.me-0': { marginInlineEnd: '0' },
        '.me-2': { marginInlineEnd: '0.5rem' },
        '.me-4': { marginInlineEnd: '1rem' },
        '.me-8': { marginInlineEnd: '2rem' },
        '.me-auto': { marginInlineEnd: 'auto' },
        '.start-0': { insetInlineStart: '0' },
        '.end-0': { insetInlineEnd: '0' },
      });

      // RTL variant
      addVariant('rtl', '[dir="rtl"] &');
      addVariant('ltr', '[dir="ltr"] &');
    },
  ],
}