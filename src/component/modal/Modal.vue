<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    closeOnClickBackground?: boolean
    showCloseButton?: boolean
    modalClass?: string
  }>(),
  {
    closeOnClickBackground: true,
    showCloseButton: true,
  },
)

const emit = defineEmits<{
  "update:open": [value: boolean]
}>()

const close = () => emit("update:open", false)
</script>

<template>
  <Teleport to=".modals-wrapper" v-if="open">
    <div
      class="modal-background"
      @click="() => { if (closeOnClickBackground) close() }"
    >
      <div
        :class="['modal', modalClass].filter(Boolean).join(' ')"
        @click.stop
      >
        <div v-if="showCloseButton" class="close-button-wrapper">
          <button class="close-button" @click.stop="close"></button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
