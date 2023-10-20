import { createApp } from 'vue'
import App from './App.vue'

import { defineCustomElement } from 'vue'
import EmojiMusicRecaptcha     from './components/emoji-music-recaptcha.ce.vue';
import EmojiSecret from './components/emoji-secret.ce.vue';
import EmojiCanvas from './components/emoji-canvas.vue';

const EmojiCanvasElement = defineCustomElement(EmojiCanvas)
customElements.define('emoji-canvas', EmojiCanvasElement)

const EmojiMusicRecaptchaElement = defineCustomElement(EmojiMusicRecaptcha)
customElements.define('emoji-music-recaptcha', EmojiMusicRecaptchaElement)

const EmojiSecretElement = defineCustomElement(EmojiSecret)
customElements.define('emoji-secret', EmojiSecretElement)

createApp(App).mount('#appEMR')
