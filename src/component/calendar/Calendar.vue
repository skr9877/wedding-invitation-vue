<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import {
  BRIDE_FIRSTNAME,
  GROOM_FIRSTNAME,
  HOLIDAYS,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import LazyDiv from "../lazyDiv/LazyDiv.vue"

const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

const tsDiff = ref(WEDDING_DATE.diff())
let interval: ReturnType<typeof setInterval>

const dayDiff = computed(() => {
  const dayOffset = WEDDING_DATE.diff(WEDDING_DATE.startOf("day"))
  return Math.ceil((tsDiff.value - dayOffset) / 1000 / 60 / 60 / 24)
})

const diffs = computed(() => {
  const tsDiff_ = Math.abs(tsDiff.value)
  const seconds = Math.floor((tsDiff_ % 60000) / 1000)
  const minutes = Math.floor((tsDiff_ % 3600000) / 60000)
  const hours = Math.floor((tsDiff_ % 86400000) / 3600000)
  const days = Math.floor(tsDiff_ / 86400000)
  return { days, hours, minutes, seconds }
})

const calendarDays = computed(() =>
  Array.from({ length: daysInMonth }).map((_, i) => {
    const date = i + 1
    const isSunday = (i + firstDayOfWeek) % 7 === 0
    const isHoliday = isSunday || HOLIDAYS.includes(date)
    const isWeddingDate = date === WEDDING_DATE.date()
    return { date, isHoliday, isWeddingDate }
  }),
)

onMounted(() => {
  interval = setInterval(() => {
    tsDiff.value = WEDDING_DATE.diff()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <LazyDiv class="card calendar">
    <h2 class="english">The Wedding Day</h2>
    <div class="break" />
    {{ WEDDING_DATE.format(WEDDING_DATE_FORMAT) }}

    <div class="calendar-wrapper">
      <div class="head holiday"><span>Su</span></div>
      <div class="head"><span>Mo</span></div>
      <div class="head"><span>Tu</span></div>
      <div class="head"><span>We</span></div>
      <div class="head"><span>Th</span></div>
      <div class="head"><span>Fr</span></div>
      <div class="head"><span>Sa</span></div>

      <div v-for="i in firstDayOfWeek" :key="`empty-${i}`" />

      <div
        v-for="day in calendarDays"
        :key="day.date"
        :class="[day.isHoliday && 'holiday', day.isWeddingDate && 'wedding-date'].filter(Boolean).join(' ') || undefined"
      >
        <span>{{ day.date }}</span>
        <div v-if="day.isWeddingDate" class="heart" />
      </div>
    </div>

    <div class="countdown-wrapper">
      <div class="countdown">
        <div class="unit">DAY</div>
        <div />
        <div class="unit">HOUR</div>
        <div />
        <div class="unit">MIN</div>
        <div />
        <div class="unit">SEC</div>
        <div class="count">{{ diffs.days }}</div>
        <span>:</span>
        <div class="count">{{ diffs.hours }}</div>
        <span>:</span>
        <div class="count">{{ diffs.minutes }}</div>
        <span>:</span>
        <div class="count">{{ diffs.seconds }}</div>
      </div>
      <div class="message">
        {{ GROOM_FIRSTNAME }} &amp; {{ BRIDE_FIRSTNAME }}의 결혼식이
        <template v-if="dayDiff > 0">
          <span class="d-day">{{ dayDiff }}</span
          >일 남았습니다.
        </template>
        <template v-else-if="dayDiff === 0">오늘입니다.</template>
        <template v-else>
          <span class="d-day">{{ -dayDiff }}</span
          >일 지났습니다.
        </template>
      </div>
    </div>
  </LazyDiv>
</template>
