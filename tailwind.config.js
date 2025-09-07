// tailwind.config.js - Refined Bold Design System (No Neon)
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        // Sophisticated dark palette
        dark: {
          950: '#050505',
          900: '#0A0A0B',
          800: '#111113',
          700: '#1A1A1D',
          600: '#242428',
          500: '#2E2E34',
          400: '#3E3E44',
        },
        // Premium accent colors (no neon)
        accent: {
          purple: '#8B5CF6',
          violet: '#7C3AED',
          indigo: '#6366F1',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        // Subtle gradients
        gradient: {
          'purple-start': '#8B5CF6',
          'purple-end': '#6366F1',
          'blue-start': '#3B82F6',
          'blue-end': '#06B6D4',
          'dark-start': '#1A1A1D',
          'dark-end': '#050505',
        },
        // Glass colors
        glass: {
          white: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.12)',
          dark: 'rgba(0, 0, 0, 0.6)',
          purple: 'rgba(139, 92, 246, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Clash Display', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        // Bold but refined typography
        'display-massive': ['clamp(3.5rem, 10vw, 7rem)', { 
          lineHeight: '0.95', 
          letterSpacing: '-0.04em',
          fontWeight: '800'
        }],
        'display-2xl': ['clamp(3rem, 8vw, 6rem)', { 
          lineHeight: '1', 
          letterSpacing: '-0.03em',
          fontWeight: '700'
        }],
        'display-xl': ['clamp(2.5rem, 7vw, 5rem)', { 
          lineHeight: '1.05', 
          letterSpacing: '-0.02em',
          fontWeight: '700'
        }],
        'display-lg': ['clamp(2rem, 6vw, 4rem)', { 
          lineHeight: '1.1', 
          letterSpacing: '-0.02em',
          fontWeight: '600'
        }],
        'display-md': ['clamp(1.5rem, 5vw, 3rem)', { 
          lineHeight: '1.15', 
          letterSpacing: '-0.01em',
          fontWeight: '600'
        }],
      },
      backgroundImage: {
        // Refined gradients (no neon)
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #1A1A1D 0%, #2E2E34 50%, #1A1A1D 100%)',
        'gradient-mesh': 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
        'gradient-cool': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        // Patterns
        'pattern-grid': `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        'pattern-dots': `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(255,255,255,0.02)'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        'pattern-noise': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02' /%3E%3C/svg%3E")`,
      },
      boxShadow: {
        // Refined shadows (no glow)
        'soft': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'large': '0 10px 25px rgba(0, 0, 0, 0.15), 0 6px 10px rgba(0, 0, 0, 0.08)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.5)',
        'brutal': '8px 8px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '4px 4px 0px rgba(0, 0, 0, 1)',
      },
      animation: {
        // Smooth animations (no pulse/glow)
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float-slow 30s ease-in-out infinite',
        'morph': 'morph 20s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.6s ease-out',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': '0% 50%',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': '100% 50%',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(20px)' },
          '66%': { transform: 'translateY(20px) translateX(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)' },
        },
        'morph': {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          },
          '50%': {
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom utilities
    function({ addUtilities }) {
      addUtilities({
        // Glass morphism (refined)
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px) saturate(180%)',
          WebkitBackdropFilter: 'blur(10px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.glass-heavy': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
        // Text gradients (subtle)
        '.text-gradient': {
          backgroundImage: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.text-gradient-warm': {
          backgroundImage: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        // Masks
        '.mask-gradient': {
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        },
      });
    },
  ],
};