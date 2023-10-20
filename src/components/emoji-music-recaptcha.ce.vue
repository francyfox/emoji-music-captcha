<script setup lang="ts">
import { EmojiDictionary, EmojiDictionaryItem } from './emoji.dictionary';
import SC from '/src/lib/soundcloud'
import vSelect from 'vue-select';

import { Ref, ref, onMounted } from 'vue';
import EmojiCanvas             from './emoji-canvas.vue';

const props = withDefaults(defineProps<{
  dark: boolean
}>(), {
  dark: false
})

const emit = defineEmits(['captchaValidate', 'captchaReload']);

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function trackSrc(track: string) {
  return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
}

const randomItems = ref(getMultipleRandom(EmojiDictionary, 4))
const correctItem: Ref<EmojiDictionaryItem> = ref(randomItems.value[Math.floor(Math.random()*randomItems.value.length)]);
const selected: Ref<EmojiDictionaryItem> = ref(randomItems.value[0])
const soundCloudPlayer = ref()
const emr = ref()
const valid = ref(false)
const error = ref(false)
const isPlay = ref(false)
const wave = ref('')


onMounted(() => {
  window.localStorage.setItem('emoji-secret', correctItem.value.emoji)

  soundCloudPlayer.value.onload = async () => {
    const widget = (SC as any).Widget(soundCloudPlayer.value) as any
  }
})

function generateRandomQuestions() {
  randomItems.value = getMultipleRandom(EmojiDictionary, 4)
  correctItem.value = randomItems.value[Math.floor(Math.random()*randomItems.value.length)]
  selected.value = randomItems.value[0]

  window.localStorage.setItem('emoji-secret', correctItem.value.emoji)
}

function triggerValid() {
  if (selected.value.code === correctItem.value.code) {
    valid.value = true
  } else {
    error.value = true
  }

  emit('captchaValidate', error.value)
}

function reload() {
  error.value = false
  generateRandomQuestions()

  emit('captchaReload')
}

function selectSong() {
  soundCloudPlayer.value.src = trackSrc(selected.value.track)
  isPlay.value = false
  console.log(isPlay.value)
}

function playSD() {
  const widget = (SC as any).Widget(soundCloudPlayer.value) as any
  isPlay.value = !isPlay.value

  widget.getCurrentSound(async (sound) => {
    wave.value = sound.waveform_url
  })

  if (isPlay.value) {
    widget.play()
  } else {
    widget.pause()
  }
}


</script>

<template>
  <div ref="emr" class="emr" :class="(props.dark) ? 'dark' : ''">
    <div class="emr--form" v-if="!valid && !error">
      <v-select v-model="selected"
                :options="randomItems"
                @option:selected="selectSong"
                :clearable="false"
      />
      <button type="button" @click="triggerValid">Верно</button>
    </div>

    <div v-if="!valid && !error" class="player">
      <iframe width="100%"
              height="166"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              id="soundCloudPlayer"
              ref="soundCloudPlayer"
              :src="trackSrc(selected.track)"></iframe>

      <button type="button" @click="playSD">
        <svg v-if="!isPlay" width="24" height="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M128,104.3v303.4c0,6.4,6.5,10.4,11.7,7.2l240.5-151.7c5.1-3.2,5.1-11.1,0-14.3L139.7,97.2C134.5,93.9,128,97.9,128,104.3z"></path></svg>
        <svg v-else width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M208 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z" fill="currentColor"></path><path d="M352 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z" fill="currentColor"></path></svg>
      </button>

      <div class="caption">
        Угадай песню!
      </div>

      <emoji-canvas :data="wave" :dark="dark" />
    </div>


    <div class="emr--success" v-if="valid">
      Ура! Нападение скайнет отменяется! Вы же человек верно?
      <img src="/leo.gif" width="200" height="200" alt="leo">
    </div>

    <div class="emr--error" v-if="error">
      Скоро брат, скоро. <a href="#" @click.prevent="reload">Повторить попытку</a>
      <img src="/buginator.gif" width="200" height="136" alt="terminator">
    </div>
  </div>
</template>

<style lang="postcss">
@import '../style.pcss';
</style>
