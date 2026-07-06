<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref<HTMLElement | null>(null)
const ready = ref(false)
const visible = ref(false)

let observer: IntersectionObserver | undefined

onMounted(() => {
  ready.value = true

  const target = root.value
  if (!target) return

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (reduceMotion || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    {
      threshold: 0.12
    }
  )

  observer.observe(target)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="motion-section"
    :class="{
      'is-ready': ready,
      'is-visible': visible
    }"
  >
    <slot />
  </div>
</template>