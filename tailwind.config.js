/** @type {import('tailwindcss').Config} */

const COLORS = {
  BG: '#F2F0F7',
  WHITE: '#FFF',
  BLACK: '#000',
  PLACEHOLDER_COLOR: '#8B8B8B',
  GRAY_LIGHT: 'lightgray',
  ORANGE: 'orange',
  PRIMARY: '#131521',
  SECONDARY: '#DF1F5A',
  TEXT_PRIMARY: '#131521',
  TEXT_SECONDARY: '#8B8B8B',
  TEXT_ERROR: '#FF4A4A',
  SUCCESS: '#27AE60',
  WARNING: '#F2994A',
  INFO: '#2D9CDB',
  BLUE: '#2F80ED',
  GREEN: '#6FCF97',
  PURPLE: '#9B51E0',
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bg: COLORS.BG,
        white: COLORS.WHITE,
        black: COLORS.BLACK,
        placeholder: COLORS.PLACEHOLDER_COLOR,
        grayLight: COLORS.GRAY_LIGHT,
        orange: COLORS.ORANGE,
        primary: COLORS.PRIMARY,
        secondary: COLORS.SECONDARY,
        textPrimary: COLORS.TEXT_PRIMARY,
        textSecondary: COLORS.TEXT_SECONDARY,
        textError: COLORS.TEXT_ERROR,
        success: COLORS.SUCCESS,
        warning: COLORS.WARNING,
        info: COLORS.INFO,
        blue: COLORS.BLUE,
        green: COLORS.GREEN,
        purple: COLORS.PURPLE,
      },
    },
  },
  plugins: [],
};
