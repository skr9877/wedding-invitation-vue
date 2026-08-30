<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { BRIDE_FULLNAME, GROOM_FULLNAME, WEDDING_DATE } from "../../const"
import { COVER_IMAGES } from "../../images"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import HeartIcon from "../../icons/heart-icon.svg"

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

// 다음 이미지가 상/하/좌/우 중 랜덤한 방향에서 슬라이드로 들어와
// 현재 이미지를 덮으며 전환되는 효과.
type Direction = "left" | "right" | "up" | "down"
const DIRECTIONS: Direction[] = ["left", "right", "up", "down"]
const randomDirection = () =>
  DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]

const currentIndex = ref(0)
const nextIndex = ref(1 % COVER_IMAGES.length)
const direction = ref<Direction>(randomDirection())
const entered = ref(false)
const enableTransition = ref(true)
let interval: ReturnType<typeof setInterval>
let revealTimeout: ReturnType<typeof setTimeout>

const offEdgeTransform = computed(() => {
  switch (direction.value) {
    case "left":
      return "translateX(-100%)"
    case "right":
      return "translateX(100%)"
    case "up":
      return "translateY(-100%)"
    case "down":
      return "translateY(100%)"
  }
})

const topLayerTransform = computed(() =>
  entered.value ? "translate(0, 0)" : offEdgeTransform.value,
)

onMounted(() => {
  interval = setInterval(() => {
    entered.value = true

    revealTimeout = setTimeout(() => {
      currentIndex.value = nextIndex.value
      nextIndex.value = (nextIndex.value + 1) % COVER_IMAGES.length
      direction.value = randomDirection()
      enableTransition.value = false
      entered.value = false
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          enableTransition.value = true
        })
      })
    }, 700)
  }, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
  clearTimeout(revealTimeout)
})
</script>

<template>
  <LazyDiv class="card cover">
    <div class="wedding-date">
      {{ WEDDING_DATE.format("YYYY") }}
      <div class="divider" />
      {{ WEDDING_DATE.format("MM") }}
      <div class="divider" />
      {{ WEDDING_DATE.format("DD") }}
    </div>
    <div class="wedding-day-of-week">
      {{ DAY_OF_WEEK[WEDDING_DATE.day()] }}
    </div>
    <div class="image-wrapper">
      <img class="bottom-layer" :src="COVER_IMAGES[currentIndex]" alt="sample" />
      <img
        class="top-layer"
        :src="COVER_IMAGES[nextIndex]"
        alt="sample"
        :style="{
          transform: topLayerTransform,
          transition: enableTransition ? 'transform 0.7s ease' : 'none',
        }"
      />
    </div>
    <div class="subtitle">Save the date for the wedding of</div>
    <div class="names">
      {{ GROOM_FULLNAME }}
      <HeartIcon class="heart" />
      {{ BRIDE_FULLNAME }}
    </div>
  </LazyDiv>
</template>
