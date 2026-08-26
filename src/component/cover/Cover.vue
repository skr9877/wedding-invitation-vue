<script setup lang="ts">
import { BRIDE_FULLNAME, GROOM_FULLNAME, WEDDING_DATE } from "../../const"
import { COVER_IMAGE } from "../../images"
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
      <img :src="COVER_IMAGE" alt="sample" />
    </div>
    <div class="subtitle">Save the date for the wedding of</div>
    <div class="names">
      {{ GROOM_FULLNAME }}
      <HeartIcon class="heart" />
      {{ BRIDE_FULLNAME }}
    </div>
  </LazyDiv>
</template>
