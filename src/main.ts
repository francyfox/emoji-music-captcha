import { createApp } from 'vue'
import App from './App.vue'

import { defineCustomElement } from 'vue'
import EmojiMusicRecaptcha     from "./components/emoji-music-recaptcha.ce.vue";

console.log(EmojiMusicRecaptcha.styles)
const EmojiMusicRecaptchaElement = defineCustomElement(EmojiMusicRecaptcha)
customElements.define('emoji-music-recaptcha', EmojiMusicRecaptchaElement)

createApp(App).mount('#appEMR')
