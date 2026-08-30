import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'


// ------------------ para github-pages ----------------------
export default defineConfig({

  base: '/MonsieurKotovFS/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
// -----------------------------------------------------

// https://vite.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')
//
//
//   // -------Uncomm for production/dev/local-------------
//   return {plugins: [react()],
//     build: {
//       outDir: 'dist',
//     },
//     server: {
//       host: true,
//       port: 5173,
//       strictPort: true,
//       watch: {
//         usePolling: true,
//         interval: 1000
//       },
//       // -------------------------------------------------------
//       // ------------------ para dev-preprod/prod ------------------
//       // proxy:{
//       //   '/api': {
//       //     target: env.VITE_API_URL,
//       //     changeOrigin: true,
//       //   },
//       // }
//       // ------------------ para local/local-dev ------------------
//       // proxy: {
//       //   '/api': {
//       //     target: 'http://backend_dev:8080',
//       //     changeOrigin: true,
//       //     rewrite: (path) => path.replace(/^\/api/, ''),
//       //   },
//       // }
//     }
//   }
// })

