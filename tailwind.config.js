/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    boxShadow: {
      none: 'none',
      '2xs': '0 1px 2px rgba(16, 24, 40, 0.02)',
      xs: '0 1px 2px rgba(16, 24, 40, 0.02), 0 1px 3px rgba(16, 24, 40, 0.03)',
      sm: '0 1px 2px rgba(16, 24, 40, 0.02), 0 2px 6px rgba(16, 24, 40, 0.03)',
      DEFAULT: '0 1px 2px rgba(16, 24, 40, 0.02), 0 4px 12px rgba(16, 24, 40, 0.04)',
      md: '0 2px 4px rgba(16, 24, 40, 0.02), 0 6px 14px rgba(16, 24, 40, 0.04)',
      lg: '0 1px 2px rgba(16, 24, 40, 0.02), 0 6px 20px rgba(16, 24, 40, 0.04)',
      xl: '0 2px 4px rgba(16, 24, 40, 0.02), 0 10px 24px rgba(16, 24, 40, 0.05)',
      '2xl': '0 4px 8px rgba(16, 24, 40, 0.03), 0 16px 36px rgba(16, 24, 40, 0.06)',
      brand: '0 1px 2px rgba(37, 99, 235, 0.08), 0 4px 12px rgba(37, 99, 235, 0.12)',
      soft: '0 1px 2px rgba(16, 24, 40, 0.02), 0 6px 20px rgba(16, 24, 40, 0.04)',
      'soft-sm': '0 1px 2px rgba(16, 24, 40, 0.02), 0 2px 6px rgba(16, 24, 40, 0.03)',
      subtle: '0 1px 2px rgba(15, 23, 42, 0.02), 0 1px 2px rgba(15, 23, 42, 0.02)',
      card: '0 1px 2px rgba(16, 24, 40, 0.02), 0 6px 20px rgba(16, 24, 40, 0.04)',
      floating: '0 4px 8px rgba(16, 24, 40, 0.02), 0 12px 28px rgba(16, 24, 40, 0.05)',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#2563EB',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          DEFAULT: '#F59E0B',
        },
        slate: {
          850: '#131F37',
          900: '#0F172A',
          950: '#080D1A',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        card: '16px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      maxWidth: {
        container: '1240px',
        form: '480px',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
};
