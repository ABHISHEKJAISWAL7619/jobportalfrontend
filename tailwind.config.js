/** @type {import('tailwindcss').Config} */
import "tailwindcss";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default {
    plugins: [react()],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }


