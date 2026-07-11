/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)'
      },
      colors: {
        background: 'hsl(222 52% 4%)',
        foreground: 'hsl(0 0% 98%)',
        card: {
          DEFAULT: 'hsl(222 44% 8%)',
          foreground: 'hsl(0 0% 98%)'
        },
        popover: {
          DEFAULT: 'hsl(222 44% 8%)',
          foreground: 'hsl(0 0% 98%)'
        },
        primary: {
          DEFAULT: 'hsl(180 100% 50%)',
          foreground: 'hsl(222 52% 4%)'
        },
        secondary: {
          DEFAULT: 'hsl(300 100% 50%)',
          foreground: 'hsl(0 0% 98%)'
        },
        muted: {
          DEFAULT: 'hsl(222 30% 12%)',
          foreground: 'hsl(220 10% 65%)'
        },
        accent: {
          DEFAULT: 'hsl(300 100% 50%)',
          foreground: 'hsl(0 0% 98%)'
        },
        destructive: {
          DEFAULT: 'hsl(0 84% 60%)',
          foreground: 'hsl(0 0% 98%)'
        },
        border: 'hsl(222 30% 15%)',
        input: 'hsl(222 30% 15%)',
        ring: 'hsl(180 100% 50%)',
        neon: {
          cyan: 'hsl(180 100% 50%)',
          magenta: 'hsl(300 100% 50%)'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' }
        },
        'worm-flow': {
          to: { strokeDashoffset: '-320' }
        },
        // synced to the cyan wave path (baseline 150/300, amplitude 110/300, period 720/1600)
        'sail-right': {
          '0%': { left: '-8.00%', top: '50.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg)' },
          '5%': { left: '-2.35%', top: '26.42%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '10%': { left: '3.30%', top: '13.88%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '15%': { left: '8.95%', top: '18.24%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '20%': { left: '14.60%', top: '37.46%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '25%': { left: '20.25%', top: '62.54%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '30%': { left: '25.90%', top: '81.76%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '35%': { left: '31.55%', top: '86.12%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '40%': { left: '37.20%', top: '73.58%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '45%': { left: '42.85%', top: '50.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg)' },
          '50%': { left: '48.50%', top: '26.42%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '55%': { left: '54.15%', top: '13.88%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '60%': { left: '59.80%', top: '18.24%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '65%': { left: '65.45%', top: '37.46%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '70%': { left: '71.10%', top: '62.54%', transform: 'translate(-50%, -50%) rotate(13.2deg)' },
          '75%': { left: '76.75%', top: '81.76%', transform: 'translate(-50%, -50%) rotate(7.0deg)' },
          '80%': { left: '82.40%', top: '86.12%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' },
          '85%': { left: '88.05%', top: '73.58%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '90%': { left: '93.70%', top: '50.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg)' },
          '95%': { left: '99.35%', top: '26.42%', transform: 'translate(-50%, -50%) rotate(-10.7deg)' },
          '100%': { left: '105.00%', top: '13.88%', transform: 'translate(-50%, -50%) rotate(-2.4deg)' }
        },
        // synced to the magenta wave path (baseline 90/300, amplitude ~90/300, period 800/1600), travels right to left
        'sail-left': {
          '0%': { left: '105.00%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(14.0deg) scaleX(-1)' },
          '5%': { left: '99.35%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '10%': { left: '93.70%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '15%': { left: '88.05%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '20%': { left: '82.40%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '25%': { left: '76.75%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg) scaleX(-1)' },
          '30%': { left: '71.10%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '35%': { left: '65.45%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '40%': { left: '59.80%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '45%': { left: '54.15%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '50%': { left: '48.50%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(14.0deg) scaleX(-1)' },
          '55%': { left: '42.85%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '60%': { left: '37.20%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '65%': { left: '31.55%', top: '56.63%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '70%': { left: '25.90%', top: '46.46%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '75%': { left: '20.25%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(-14.0deg) scaleX(-1)' },
          '80%': { left: '14.60%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(-11.3deg) scaleX(-1)' },
          '85%': { left: '8.95%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(-4.3deg) scaleX(-1)' },
          '90%': { left: '3.30%', top: '3.37%', transform: 'translate(-50%, -50%) rotate(4.3deg) scaleX(-1)' },
          '95%': { left: '-2.35%', top: '13.54%', transform: 'translate(-50%, -50%) rotate(11.3deg) scaleX(-1)' },
          '100%': { left: '-8.00%', top: '30.00%', transform: 'translate(-50%, -50%) rotate(14.0deg) scaleX(-1)' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'worm-flow': 'worm-flow 4s linear infinite',
        'sail-right': 'sail-right 9s linear infinite',
        'sail-left': 'sail-left 11s linear infinite'
      }
    }
  },
  plugins: [],
}
