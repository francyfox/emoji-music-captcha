import { createApp } from 'vue'
import App from './App.vue'

import { defineCustomElement } from 'vue'
import EmojiMusicRecaptcha     from './components/emoji-music-recaptcha.ce.vue';
import EmojiSecret             from './components/emoji-secret.ce.vue';

const EmojiMusicRecaptchaElement = defineCustomElement(EmojiMusicRecaptcha)
customElements.define('emoji-music-recaptcha', EmojiMusicRecaptchaElement)

const EmojiSecretElement = defineCustomElement(EmojiSecret)
customElements.define('emoji-secret', EmojiSecretElement)

createApp(App).mount('#appEMR')
