import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        accent: '#F5C400',
        muted: '#888888',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
