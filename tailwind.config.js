module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1128',
          light: '#1F2A48'
        },
        secondary: {
          DEFAULT: '#7B4CFF',
          light: '#9E7DFF'
        },
        accent: {
          DEFAULT: '#00E5E8',
          light: '#7CFCFF'
        },
        gold: '#FFBD00',
        light: '#F8F8F8',
        dark: '#141414'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Clash Display"', 'sans-serif']
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};