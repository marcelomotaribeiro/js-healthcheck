import { resolve } from 'path'

module.exports = { 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        healthpanel: resolve(__dirname, 'src/pages/health-panel/health-panel.html')
      }
    }
  }
}