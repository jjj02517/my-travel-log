/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './skeletons/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        dark: '#0a0a0a',
        button: {
          DEFAULT: '#4f46e5',        // 기본 버튼
          hover: '#4338ca',
          dark: '#3b82f6',
          darkHover: '#2563eb',
        },
        outline: {
          DEFAULT: '#4f46e5',
          dark: '#3b82f6',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
} 