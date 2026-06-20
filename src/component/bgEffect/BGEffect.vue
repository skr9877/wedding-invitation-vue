<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import petalUrl from "../../icons/petal.png"

const X_SPEED = 0.6
const X_SPEED_VARIANCE = 0.8
const Y_SPEED = 0.4
const Y_SPEED_VARIANCE = 0.4
const FLIP_SPEED_VARIANCE = 0.02

class Petal {
  x: number
  y: number
  w = 0
  h = 0
  opacity = 0
  flip = 0
  xSpeed = 0
  ySpeed = 0
  flipSpeed = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private petalImg: HTMLImageElement,
  ) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height
    this.initialize()
  }

  initialize() {
    this.w = 25 + Math.random() * 15
    this.h = 20 + Math.random() * 10
    this.opacity = this.w / 80
    this.flip = Math.random()
    this.xSpeed = X_SPEED + Math.random() * X_SPEED_VARIANCE
    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE
    this.flipSpeed = Math.random() * FLIP_SPEED_VARIANCE
  }

  draw() {
    if (this.y > this.canvas.height || this.x > this.canvas.width) {
      this.initialize()
      const rand = Math.random() * (this.canvas.width + this.canvas.height)
      if (rand > this.canvas.width) {
        this.x = 0
        this.y = rand - this.canvas.width
      } else {
        this.x = rand
        this.y = 0
      }
    }
    this.ctx.globalAlpha = this.opacity
    this.ctx.drawImage(
      this.petalImg,
      this.x,
      this.y,
      this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5),
    )
  }

  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.flip += this.flipSpeed
    this.draw()
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let petals: Petal[] = []
let animationFrameId = 0
let resizeTimeout = 0

onMounted(() => {
  const canvas = canvasRef.value!
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  const petalImg = new Image()
  petalImg.src = petalUrl

  const getPetalNum = () =>
    Math.floor((window.innerWidth * window.innerHeight) / 30000)

  const initializePetals = () => {
    petals = Array.from(
      { length: getPetalNum() },
      () => new Petal(canvas, ctx, petalImg),
    )
  }

  initializePetals()

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    petals.forEach((p) => p.animate())
    animationFrameId = requestAnimationFrame(render)
  }

  render()

  const onResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const newCount = getPetalNum()
      if (newCount > petals.length) {
        for (let i = petals.length; i < newCount; i++) {
          petals.push(new Petal(canvas, ctx, petalImg))
        }
      } else {
        petals.splice(newCount)
      }
    }, 100)
  }

  window.addEventListener("resize", onResize)
  onUnmounted(() => {
    window.removeEventListener("resize", onResize)
    cancelAnimationFrame(animationFrameId)
  })
})
</script>

<template>
  <div class="bg-effect">
    <canvas ref="canvasRef" />
  </div>
</template>
