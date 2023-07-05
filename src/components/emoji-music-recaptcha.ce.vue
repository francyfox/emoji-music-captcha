<script setup lang="ts">
import { EmojiDictionary, EmojiDictionaryItem } from './emoji.dictionary';
import vSelect                                  from "vue-select";

import { Ref, ref, onMounted } from 'vue';


const props = withDefaults(defineProps<{
  dark: boolean
}>(), {
  dark: false
})

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

const event = new CustomEvent('captchaValid', {
  detail: {
    answer: correctItem.value
  }
})

function generateRandomQuestions() {
  randomItems.value = getMultipleRandom(EmojiDictionary, 4)
  correctItem.value = randomItems.value[Math.floor(Math.random()*randomItems.value.length)]
  selected.value = randomItems.value[0]
}

function triggerValid() {
  if (selected.value.code === correctItem.value.code) {
    valid.value = true
    emr.value.dispatchEvent(event);
  } else {
    error.value = true
  }
}

function reload() {
  error.value = false
  generateRandomQuestions()
}


</script>

<template>
  <div ref="emr" class="emr" :class="(props.dark) ? 'dark' : ''">
    <div class="emr--form" v-if="!valid && !error">
      <v-select v-model="selected"
                :options="randomItems"
                @input="soundCloudPlayer.src = trackSrc(selected.track)"
                :clearable="false"
      />
      <button type="button" @click="triggerValid">Верно</button>
    </div>


    <iframe width="100%"
            height="166"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            ref="soundCloudPlayer"
            v-if="!valid && !error"
            :src="trackSrc(selected.track)"></iframe>

    <div class="emr--success" v-if="valid">
      Ура! Нападение скайнет отменяется! Вы же человек верно?
      <img src="/leo.gif" width="200" height="200">
    </div>

    <div class="emr--error" v-if="error">
      Скоро брат, скоро. <a href="#" @click.prevent="reload">Повторить попытку</a>
      <img src="/buginator.gif" width="200" height="136">
    </div>
  </div>
</template>

<style lang="postcss">
@import 'vue-select/dist/vue-select.css';
@import '../style.pcss';
</style>
