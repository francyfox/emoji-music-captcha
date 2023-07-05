<script setup lang="ts">
import { EmojiDictionary, EmojiDictionaryItem } from './emoji.dictionary';
import vSelect                                  from "vue-select";
import 'vue-select/dist/vue-select.css';
import { Ref, ref, onMounted } from 'vue';

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function trackSrc(track: string) {
  return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`
}

const randomItems = getMultipleRandom(EmojiDictionary, 4)
const correctItem: EmojiDictionaryItem = randomItems[Math.floor(Math.random()*randomItems.length)];
const selected: Ref<EmojiDictionaryItem> = ref(randomItems[0])
const soundCloudPlayer = ref()
const emr = ref()
const valid = ref(false)
const error = ref(false)

const event = new CustomEvent('captchaValid', {
  detail: {
    answer: correctItem
  }
})

function triggerValid() {
  if (selected.value.code === correctItem.code) {
    valid.value = true
    emr.value.dispatchEvent(event);
  } else {
    error.value = true
  }
}

function reload() {
  error.value = false
}

onMounted(() => {
  document.captchaCode = correctItem.emoji
})
</script>

<template>
  <div ref="emr" class="emr">
    <div class="emr--form" v-if="!valid && !error">
      <v-select v-model="selected"
                :options="randomItems"
                @input="soundCloudPlayer.src = trackSrc(selected.track)"
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

<style scoped>
.emr {
  width: 100%;
  max-width: 350px;
}

.emr--form {
  gap: 5px;
  display: flex;
  align-items: center;

  .v-select {
    flex-grow: 1;
  }
}

.emr--success, .emr--error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
  font-size: 1.2em;

  img {
    border-radius: 3px;
    box-shadow: 0 0 0 2px black;
  }
}
</style>
