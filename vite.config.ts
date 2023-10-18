import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssNesting
      ],
    },
  },
  plugins: [vue(
      {
        customElement: true,
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('emoji-')
          }
        }
      }
  ),],
  build: {
    // rollupOptions: {
    //   // Externalize deps that shouldn't be bundled into the library.
    //   external: ['vue'],
    // },
    lib: {
      entry: './src/main.ts',
      name: 'emoji-music-recaptcha',
      // the proper extensions will be added
      fileName: 'emoji-music-recaptcha'
    }
  }
})
