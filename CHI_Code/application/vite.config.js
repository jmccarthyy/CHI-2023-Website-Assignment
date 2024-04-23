import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * vite.config.js
 * 
 * @author Jake McCarthy
 */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kf6012/application/'
})
