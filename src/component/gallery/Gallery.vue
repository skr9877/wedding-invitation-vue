<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import ArrowLeft from "../../icons/angle-left-sm.svg"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import Button from "../button/Button.vue"
import Modal from "../modal/Modal.vue"
import { GALLERY_IMAGES } from "../../images"

const DRAG_SENSITIVITY = 15

type Status =
  | "stationary"
  | "clicked"
  | "clickCanceled"
  | "dragging"
  | "dragEnding"
  | "moving-left"
  | "moving-right"

type DragOption = {
  startingClientX: number
  startingClientY: number
  currentTranslateX: number
}

const modalOpen = ref(false)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const carouselRef = ref<HTMLDivElement | null>(null)
const slide = ref(0)
const status = ref<Status>("stationary")
const dragOption = ref<DragOption>({
  startingClientX: 0,
  startingClientY: 0,
  currentTranslateX: 0,
})
const moveOption = ref({ srcIdx: 0, dstIdx: 0 })
let clickMove: "left" | "right" | null = null

const visibleSlideIndices = computed(() => {
  const total = GALLERY_IMAGES.length
  const cur = slide.value

  if (["dragging", "dragEnding"].includes(status.value)) {
    const result: number[] = []
    if (cur === 0) result.push(total - 1)
    const start = cur === 0 ? 0 : cur - 1
    const end = Math.min(cur + 2, total)
    for (let i = start; i < end; i++) result.push(i)
    if (cur === total - 1) result.push(0)
    return result
  }

  if (status.value === "moving-right") {
    return Array.from(
      { length: moveOption.value.dstIdx - moveOption.value.srcIdx + 1 },
      (_, i) => moveOption.value.srcIdx + i,
    )
  }

  if (status.value === "moving-left") {
    return Array.from(
      { length: moveOption.value.srcIdx - moveOption.value.dstIdx + 1 },
      (_, i) => moveOption.value.dstIdx + i,
    )
  }

  return [cur]
})

const transformStyle = computed(() => {
  if (["dragging", "dragEnding"].includes(status.value)) {
    return { transform: `translateX(${dragOption.value.currentTranslateX}px)` }
  }
  return {}
})

const transformClass = computed(() => {
  switch (status.value) {
    case "dragEnding":
      return "carousel-list transitioning"
    case "moving-left":
      return "carousel-list moving-left"
    case "moving-right":
      return "carousel-list moving-right"
    default:
      return "carousel-list"
  }
})

const click = (clientX: number, clientY: number, carouselWidth: number) => {
  if (status.value !== "stationary") return
  dragOption.value = {
    startingClientX: clientX,
    startingClientY: clientY,
    currentTranslateX: -carouselWidth,
  }
  status.value = "clicked"
}

const dragging = (clientX: number, carouselWidth: number) => {
  let moveTranslateX = clientX - dragOption.value.startingClientX
  if (moveTranslateX > carouselWidth) moveTranslateX = carouselWidth
  else if (moveTranslateX < -carouselWidth) moveTranslateX = -carouselWidth
  dragOption.value = {
    ...dragOption.value,
    currentTranslateX: moveTranslateX - carouselWidth,
  }
}

const dragEnd = (carouselWidth: number) => {
  let move = 0
  if (dragOption.value.currentTranslateX < -carouselWidth * 1.1) move = 1
  else if (dragOption.value.currentTranslateX > -carouselWidth * 0.9) move = -1

  const capturedSlide = slide.value
  const capturedDragOption = { ...dragOption.value }

  dragOption.value = {
    ...capturedDragOption,
    currentTranslateX: -carouselWidth * (move + 1),
  }
  status.value = "dragEnding"

  setTimeout(() => {
    dragOption.value = {
      ...capturedDragOption,
      currentTranslateX: -carouselWidth,
    }
    status.value = "stationary"
    slide.value =
      (capturedSlide + move + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
  }, 300)
}

const move = (srcIdx: number, dstIdx: number) => {
  slide.value = dstIdx
  status.value = srcIdx < dstIdx ? "moving-right" : "moving-left"
  moveOption.value = { srcIdx, dstIdx }
  setTimeout(() => {
    clickMove = null
    status.value = "stationary"
  }, 300)
}

const onMouseMove = (e: MouseEvent) => {
  if (status.value === "clicked") {
    status.value = "dragging"
  } else if (status.value === "dragging") {
    e.preventDefault()
    dragging(e.clientX, carouselRef.value!.clientWidth)
  }
}

const onTouchMove = (e: TouchEvent) => {
  if (status.value === "clicked") {
    e.preventDefault()
    const xMove =
      e.targetTouches[0].clientX - dragOption.value.startingClientX
    const yMove =
      e.targetTouches[0].clientY - dragOption.value.startingClientY
    if (Math.abs(xMove) > DRAG_SENSITIVITY) {
      status.value = "dragging"
    } else if (Math.abs(yMove) > DRAG_SENSITIVITY) {
      status.value = "clickCanceled"
    }
  } else if (status.value === "dragging") {
    e.preventDefault()
    dragging(e.targetTouches[0].clientX, carouselRef.value!.clientWidth)
  }
}

const onMouseTouchUp = () => {
  if (status.value === "clicked") {
    if (clickMove === "left") {
      move(
        slide.value,
        (slide.value + GALLERY_IMAGES.length - 1) % GALLERY_IMAGES.length,
      )
    } else if (clickMove === "right") {
      move(slide.value, (slide.value + 1) % GALLERY_IMAGES.length)
    } else {
      status.value = "stationary"
    }
  } else if (status.value === "dragging") {
    dragEnd(carouselRef.value!.clientWidth)
  } else if (status.value === "clickCanceled") {
    status.value = "stationary"
  }
}

const onIndicatorClick = (dstIdx: number) => {
  if (status.value !== "stationary" || slide.value === dstIdx) return
  move(slide.value, dstIdx)
}

const showPrevInLightbox = () => {
  lightboxIndex.value =
    (lightboxIndex.value + GALLERY_IMAGES.length - 1) % GALLERY_IMAGES.length
}

const showNextInLightbox = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % GALLERY_IMAGES.length
}

onMounted(() => {
  GALLERY_IMAGES.forEach((image) => {
    const img = new Image()
    img.src = image
  })

  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("mouseup", onMouseTouchUp)
  window.addEventListener("touchend", onMouseTouchUp)
  if (carouselRef.value) {
    carouselRef.value.addEventListener("touchmove", onTouchMove)
  }
})

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove)
  window.removeEventListener("mouseup", onMouseTouchUp)
  window.removeEventListener("touchend", onMouseTouchUp)
  if (carouselRef.value) {
    carouselRef.value.removeEventListener("touchmove", onTouchMove)
  }
})
</script>

<template>
  <LazyDiv class="card gallery">
    <h2 class="english">Gallery</h2>
    <div class="carousel-wrapper">
      <div
        class="carousel"
        ref="carouselRef"
        @mousedown="
          (e) =>
            click(
              e.clientX,
              e.clientY,
              (e.currentTarget as HTMLElement).clientWidth,
            )
        "
        @touchstart="
          (e) =>
            click(
              e.targetTouches[0].clientX,
              e.targetTouches[0].clientY,
              (e.currentTarget as HTMLElement).clientWidth,
            )
        "
      >
        <div :class="transformClass" :style="transformStyle">
          <div
            v-for="idx in visibleSlideIndices"
            :key="idx"
            class="carousel-item"
          >
            <img
              :src="GALLERY_IMAGES[idx]"
              :draggable="false"
              :alt="`${idx}`"
            />
          </div>
        </div>

        <div class="carousel-control">
          <div
            class="control left"
            @mousedown="() => { if (status === 'stationary') clickMove = 'left' }"
            @touchstart="() => { if (status === 'stationary') clickMove = 'left' }"
          >
            <ArrowLeft class="arrow" />
          </div>
          <div
            class="control right"
            @mousedown="() => { if (status === 'stationary') clickMove = 'right' }"
            @touchstart="() => { if (status === 'stationary') clickMove = 'right' }"
          >
            <ArrowLeft class="arrow right" />
          </div>
        </div>
      </div>

      <div class="carousel-indicator">
        <button
          v-for="(_, idx) in GALLERY_IMAGES"
          :key="idx"
          :class="`indicator${idx === slide ? ' active' : ''}`"
          @click="onIndicatorClick(idx)"
        />
      </div>
    </div>

    <div class="break" />

    <Button class="photo-list-button" @click="modalOpen = true"
      >사진 전체보기</Button
    >
  </LazyDiv>

  <Modal
    v-model:open="modalOpen"
    modal-class="all-photo-modal"
    :close-on-click-background="true"
  >
    <div class="header">
      <div class="title">사진 전체보기</div>
    </div>

    <div class="content">
      <div class="photo-list">
        <img
          v-for="(image, idx) in GALLERY_IMAGES"
          :key="idx"
          :src="image"
          :alt="`${idx}`"
          :draggable="false"
          @click="
            () => {
              lightboxIndex = idx
              lightboxOpen = true
              modalOpen = false
            }
          "
        />
      </div>
      <div class="break" />
    </div>
    <div class="footer">
      <Button
        button-style="style2"
        class="bg-light-grey-color text-dark-color"
        @click="modalOpen = false"
      >
        닫기
      </Button>
    </div>
  </Modal>

  <Modal
    v-model:open="lightboxOpen"
    modal-class="lightbox-modal"
    :close-on-click-background="true"
  >
    <div class="lightbox-content">
      <img
        :src="GALLERY_IMAGES[lightboxIndex]"
        :alt="`${lightboxIndex}`"
        :draggable="false"
      />
      <div class="lightbox-control">
        <div class="control left" @click="showPrevInLightbox">
          <ArrowLeft class="arrow" />
        </div>
        <div class="control right" @click="showNextInLightbox">
          <ArrowLeft class="arrow right" />
        </div>
      </div>
    </div>
  </Modal>
</template>
