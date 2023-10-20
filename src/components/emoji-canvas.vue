<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  data: string
  dark: boolean
}>()

const ac = ref();
const visualize = ref()

onMounted(() => {
  ac.value = new AudioContext()
})

watch(() => props.data, async () => {
  try {
    const response = (await fetch(props.data))
    await draw(response)
  } catch (e) {
    console.log(e)
    alert('Something went wrong! Oops! Wtf soundcloud')
  }
})

watch(() => props.dark, async () => {
  try {
    const response = (await fetch(props.data))
    await draw(response)
  } catch (e) {
    console.log(e)
    alert('Something went wrong! Oops! Wtf soundcloud')
  }
})


async function draw(response: Response) {
  const waves = await response.json() as { samples: number[], width: number, height: number }
  const ctx = (visualize.value as HTMLCanvasElement).getContext('2d')

  const { width, height } = visualize.value
  ctx.fillStyle = props.dark ? '#d36e3b' : '#dc4e4e'

  ctx.clearRect(0, 0, width, height)

  waves.samples.forEach((bar, index) => {
    const percentage = Math.floor(bar * 100 / waves.height)
    const barHeight = Math.floor(percentage * 100 / height * 2)
    ctx.fillRect(index, 0, width / waves.samples.length, barHeight)
  })
}
</script>

<template>
  <div class="bar">
    <canvas ref="visualize"></canvas>
  </div>
</template>

<style scoped>
  .bar canvas {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>