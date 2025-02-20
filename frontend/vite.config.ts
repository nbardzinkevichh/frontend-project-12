import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return ({
    define: {
      'process.env.ROLLBAR_ACCESS_TOKEN_R': JSON.stringify(env.ROLLBAR_ACCESS_TOKEN_R),
    },
    plugins: [react()],
    server: {
      port: 5002,
      proxy: {
        // Проксируем запросы к API
        '/api': {
          target: 'http://localhost:5001',
        },
        // Проксируем WebSocket соединения
        '/socket.io': {
          target: 'ws://localhost:5001',
          ws: true,
          rewriteWsOrigin: true,
        },
      },
    },
  })
})
