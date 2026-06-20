<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const wrapperRef = ref<HTMLDivElement | null>(null)
let mutationObserver: MutationObserver | null = null

const focusTrap = (e: KeyboardEvent) => {
  if (e.key !== "Tab") return
  const wrapper = wrapperRef.value
  if (!wrapper) return
  const lastModal = wrapper.lastChild as HTMLElement
  if (!lastModal) return

  const focusable = lastModal.querySelectorAll(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
  ) as NodeListOf<HTMLElement>

  if (focusable.length === 0) {
    e.preventDefault()
    return
  }

  if (!document.activeElement) {
    e.preventDefault()
    focusable[0].focus()
    return
  }

  let idx = -1
  for (let i = 0; i < focusable.length; i++) {
    if (focusable[i] === document.activeElement) {
      idx = i
      break
    }
  }

  if (idx === -1) {
    e.preventDefault()
    focusable[0].focus()
    return
  }

  if (e.shiftKey) {
    if (idx === 0) {
      e.preventDefault()
      focusable[focusable.length - 1].focus()
    }
  } else {
    if (idx === focusable.length - 1) {
      e.preventDefault()
      focusable[0].focus()
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", focusTrap)

  if (wrapperRef.value) {
    mutationObserver = new MutationObserver((mutationList) => {
      const mutated = mutationList.some((m) => m.type === "childList")
      if (!mutated) return
      const hasModals = (wrapperRef.value?.childElementCount ?? 0) > 0
      document.body.classList.toggle("modal-open", hasModals)
    })
    mutationObserver.observe(wrapperRef.value, { childList: true })
  }
})

onUnmounted(() => {
  window.removeEventListener("keydown", focusTrap)
  mutationObserver?.disconnect()
})
</script>

<template>
  <slot />
  <div class="modals-wrapper" ref="wrapperRef"></div>
</template>
