<script setup lang="ts">
import Map from "./Map.vue"
import CarIcon from "../../icons/car-icon.svg"
import BusIcon from "../../icons/bus-icon.svg"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import { LOCATION, LOCATION_ADDRESS } from "../../const"
</script>

<template>
  <LazyDiv class="card location">
    <h2 class="english">Location</h2>
    <div class="addr">
      {{ LOCATION }}
      <div class="detail">{{ LOCATION_ADDRESS.replace("289 ", "289\n") }}</div>
    </div>
    <Map />
  </LazyDiv>

  <LazyDiv class="card location transportation">
    <div class="location-info">
      <div class="transportation-icon-wrapper">
        <BusIcon class="transportation-icon" />
      </div>
      <div class="heading">대중교통</div>
      <div />
      <div class="content">
        * <b>지하철</b><br />
        지하철 수인분당선 <b>수원시청역 10번출구</b>
      </div>
      <div />
      <div class="content">
        * <b>버&nbsp;&nbsp;&nbsp;스</b><br />
        - 지선(초록): 13-1, 20-2, 92, 92-1, 99-2, 201, 202<br />
        - 광역(빨강): 3002, 4000, 4500, 6800, 7200, 8002<br />
        → 수원시청역 8,9번 출구 하차<br />

        - 지선(초록): 11-1, 61, 80, 81, 82-1<br />
        → 수원시청역 1,10번 출구 하차
      </div>
    </div>

    <div class="location-info">
      <div class="transportation-icon-wrapper">
        <CarIcon class="transportation-icon" />
      </div>
      <div class="heading">자가용</div>
      <div />
      <div class="content">
        네이버 지도, 카카오 네비, 티맵 등 이용<br />
        <b>경인일보, 파비오더씨타, 경기아트센터</b> 검색<br />
      </div>
      <div />
      <div class="content">
        <b
          >※ 웨딩홀 입구에서 주차요원 안내를 받고 이동하시기 바랍니다.</b
        >
      </div>
    </div>
  </LazyDiv>
</template>
