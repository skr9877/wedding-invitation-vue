<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    buttonStyle?: "style1" | "style2"
  }>(),
  { buttonStyle: "style1" },
)
</script>

<template>
  <button
    v-bind="$attrs"
    :class="`button ${props.buttonStyle === 'style2' ? 'button-style-2' : 'button-style-1'}${$attrs.class ? ' ' + $attrs.class : ''}`"
  >
    <slot />
  </button>
</template>
