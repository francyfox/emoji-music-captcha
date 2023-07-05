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
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('emoji-music-recaptcha')
          }
        }
      }
  ),],
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'emoji-music-recaptcha',
      // the proper extensions will be added
      fileName: 'emoji-music-recaptcha'
    }
  }
})
