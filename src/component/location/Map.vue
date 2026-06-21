<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, watch, onMounted, onUnmounted } from "vue"
import { useKakao, useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg"
import UnlockIcon from "../../icons/unlock-icon.svg"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

const naver = useNaver()
const kakao = useKakao()

const mapRef = ref<HTMLDivElement | null>(null)
const locked = ref(true)
const showLockMessage = ref(false)
let lockMessageTimeout: number | null = null
let map: any = null

const checkDevice = () => {
  const ua = window.navigator.userAgent
  if (ua.match(/(iPhone|iPod|iPad)/)) return "ios"
  if (ua.match(/(Android)/)) return "android"
  return "other"
}

const initMap = (naverValue: any) => {
  if (!mapRef.value) return
  map = new naverValue.maps.Map(mapRef.value, {
    center: new naverValue.maps.LatLng(
      WEDDING_HALL_POSITION[1],
      WEDDING_HALL_POSITION[0],
    ),
    zoom: 17,
  })
  new naverValue.maps.Marker({
    position: new naverValue.maps.LatLng(
      WEDDING_HALL_POSITION[1],
      WEDDING_HALL_POSITION[0],
    ),
    map,
  })
}

onMounted(() => {
  if (naver.value) initMap(naver.value)
})

watch(naver, (naverValue) => {
  if (naverValue) initMap(naverValue)
})

onUnmounted(() => {
  if (map) map.destroy()
  if (lockMessageTimeout !== null) clearTimeout(lockMessageTimeout)
})

const showLock = () => {
  showLockMessage.value = true
  if (lockMessageTimeout !== null) clearTimeout(lockMessageTimeout)
  lockMessageTimeout = window.setTimeout(() => {
    showLockMessage.value = false
  }, 3000)
}

const toggleLock = () => {
  if (lockMessageTimeout !== null) clearTimeout(lockMessageTimeout)
  showLockMessage.value = false
  locked.value = !locked.value
}

const openNaverMap = () => {
  switch (checkDevice()) {
    case "ios":
    case "android":
      window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
      break
    default:
      window.open(
        `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
        "_blank",
      )
  }
}

const openKakaoNavi = () => {
  switch (checkDevice()) {
    case "ios":
    case "android":
      if (kakao.value)
        kakao.value.Navi.start({
          name: LOCATION,
          x: WEDDING_HALL_POSITION[0],
          y: WEDDING_HALL_POSITION[1],
          coordType: "wgs84",
        })
      break
    default:
      window.open(
        `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
        "_blank",
      )
  }
}

const openTmap = () => {
  switch (checkDevice()) {
    case "ios":
    case "android": {
      const params = new URLSearchParams({
        goalx: WEDDING_HALL_POSITION[0].toString(),
        goaly: WEDDING_HALL_POSITION[1].toString(),
        goalName: LOCATION,
      })
      window.open(`tmap://route?${params.toString()}`, "_self")
      break
    }
    default:
      alert("모바일에서 확인하실 수 있습니다.")
  }
}
</script>

<template>
  <template v-if="NAVER_MAP_CLIENT_ID">
    <div class="map-wrapper">
      <div v-if="locked" class="lock" @touchstart="showLock" @mousedown="showLock">
        <div v-if="showLockMessage" class="lock-message">
          <LockIcon /> 자물쇠 버튼을 눌러<br />
          터치 잠금 해제 후 확대 및 이동해 주세요.
        </div>
      </div>
      <button :class="`lock-button${locked ? '' : ' unlocked'}`" @click="toggleLock">
        <LockIcon v-if="locked" />
        <UnlockIcon v-else />
      </button>
      <div class="map-inner" ref="mapRef" />
    </div>

    <div class="navigation">
      <button @click="openNaverMap">
        <img :src="nmapIcon" alt="naver-map-icon" />네이버 지도
      </button>
      <button @click="openKakaoNavi">
        <img :src="knaviIcon" alt="kakao-navi-icon" />카카오 내비
      </button>
      <button @click="openTmap">
        <img :src="tmapIcon" alt="t-map-icon" />티맵
      </button>
    </div>
  </template>
  <div v-else>Map is not available</div>
</template>
