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
        * <b>지하철 이용 시</b><br />
        수인분당선 <b>수원시청역 10번출구</b> 바로 앞
      </div>
      <div />
      <div class="content">
        * <b>버&nbsp;&nbsp;&nbsp;스 이용 시</b><br />
        <b>시내버스</b><br />
        - 역전정류장: 13-1, 92-1<br />
        → 수원시청역9번출구, 국민연금공단 하차<br />
        - 매산시장앞: 51<br />
        → 수원시청역1번출구, 국민연금공단, 경인일보 하차<br />
        - 수원버스터미널: 80, 81<br />
        → 수원시청역1번출구, 국민연금공단, 경인일보 하차<br />
        - 아주대, 법원사거리: 81<br />
        → 수원시청역10번출구, 국민연금공단, 경인일보 하차
      </div>
      <div />
      <div class="content">
        <b>시외버스</b><br />
        - 강남역 7번출구, 양재역 7번출구<br />
        &nbsp;&nbsp;3007번: 매탄주공4단지, 매탄1동주민센터 하차 후 81번 환승<br />
        &nbsp;&nbsp;→ 수원시청역10번출구, 경인일보 하차<br />
        &nbsp;&nbsp;3002번: 수원시청역8번출구, 씨네파크 하차<br />
        - 사당역 4번출구<br />
        &nbsp;&nbsp;7000번: 구)법원사거리 하차 후 81번 환승<br />
        &nbsp;&nbsp;→ 수원시청역10번출구, 경인일보 하차<br />
        &nbsp;&nbsp;7001번: 매탄동주민센터 하차 후 81번 환승<br />
        &nbsp;&nbsp;→ 수원시청역10번출구, 경인일보 하차<br />
        - 잠실역<br />
        &nbsp;&nbsp;M5342: 망포역4번출구 하차 후 61번 환승<br />
        &nbsp;&nbsp;→ 수원시청역10번출구, 경인일보 하차<br />
        - 서현역(AK프라자)<br />
        &nbsp;&nbsp;4000번: 수원시청역8번출구, 씨네파크 하차
      </div>
    </div>

    <div class="location-info">
      <div class="transportation-icon-wrapper">
        <CarIcon class="transportation-icon" />
      </div>
      <div class="heading">자가용</div>
      <div />
      <div class="content">
        네비게이션: <b>"파티움하우스 수원"</b> 입력<br />
        도로명 주소: 경기 수원시 팔달구 효원로 289<br />
        지번 주소: 경기 수원시 팔달구 인계동 1124-5번지
      </div>
      <div />
      <div class="content">
        * <b>주차안내</b><br />
        주차가능지역입니다.<br />
        경인일보, 파비오더씨타, 경기아트센터<br />
        <b>※ 웨딩홀 입구에서 주차요원 안내를 받고 이동하시기 바랍니다.</b><br />
        ※ 주말 차량 증가로 인해 주차장이 혼잡하오니 대중교통을 이용하여 주시기 바랍니다.
      </div>
    </div>
  </LazyDiv>
</template>
