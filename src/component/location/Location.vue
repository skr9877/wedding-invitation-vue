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
      <div class="detail">{{ LOCATION_ADDRESS }}</div>
    </div>
    <Map />
  </LazyDiv>

  <LazyDiv class="card location">
    <div class="location-info">
      <div class="transportation-icon-wrapper">
        <BusIcon class="transportation-icon" />
      </div>
      <div class="heading">대중교통</div>
      <div />
      <div class="content">
        * 지하철 이용시<br />
        지하철 2호선 <b>낙성대역 4번출구</b> 나와서<br />
        → 첫번째 골목 끼고 좌회전<br />
        → 마을버스 <b>관악 02번</b> 승차<br />
        → <b>서울대후문·연구공원 정류장</b> 하차<br />
        → 길 건너 간판 참고해 도보로 100m 이동<br />
        검은색 피라미드 유리 건물입니다.
      </div>
      <div />
      <div class="content">
        * 버스 이용 시<br />
        - 간선(파랑): 461, 641<br />
        - 지선(초록): 5413, 5524, 5528<br />
        반드시 <b>낙성대입구</b> 하차<br />
        → 마을버스 <b>관악 02번</b> 이용<br />
        이하 위와 동일합니다.
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
        <b>서울대학교 연구공원 웨딩홀</b> 검색<br />
        - 주차 요금은 무료입니다.<br />
        (주차장 이용 시 웨딩홀과 바로 연결)
      </div>
      <div />
      <div class="content">
        <b
          >※ 서울대학교 정, 후문을 통과할 경우 통행료가 발생하므로
          유의바랍니다. 낙성대 방향으로 이용해주세요.</b
        >
      </div>
    </div>
  </LazyDiv>
</template>
