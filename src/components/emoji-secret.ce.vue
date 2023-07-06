<script setup>
import {onMounted, ref} from "vue";
const secret = ref()

onMounted(() => {
  secret.value = window.localStorage.getItem('emoji-secret')

  const captcha = document.querySelector('emoji-music-recaptcha')

  captcha.addEventListener('captchaReload', function () {
    secret.value = window.localStorage.getItem('emoji-secret')
  })
})
</script>

<template>
  <span class="emr--secret">
    {{ secret }}
  </span>
</template>

<style scoped>

</style>