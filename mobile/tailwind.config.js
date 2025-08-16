/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#2675f5',
        background: '#ffffff',
        foreground: '#000000',
        primary: {
          DEFAULT: '#2675f5',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3f4f6',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#e7f0ff',
          foreground: '#2675f5',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

