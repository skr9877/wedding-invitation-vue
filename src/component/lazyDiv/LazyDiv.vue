<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

defineOptions({ inheritAttrs: false })

const divRef = ref<HTMLDivElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!divRef.value) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("lazy-active")
        observer?.unobserve(entry.target)
      }
    })
  })
  observer.observe(divRef.value)
})

onUnmounted(() => {
  if (divRef.value) observer?.unobserve(divRef.value)
})
</script>

<template>
  <div ref="divRef" v-bind="$attrs">
    <slot />
  </div>
</template>
