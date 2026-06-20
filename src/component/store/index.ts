/* eslint-disable @typescript-eslint/no-explicit-any */

import { ref, onMounted } from "vue"
import { KAKAO_SDK_JS_KEY, NAVER_MAP_CLIENT_ID } from "../../env"

const baseUrl = import.meta.env.BASE_URL
const NAVER_MAP_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`
const KAKAO_SDK_URL = `${baseUrl}/kakao_js_sdk/2.7.1/kakao.min.js`

const naver = ref<any>(null)
const kakao = ref<any>(null)

export function useNaver() {
  onMounted(() => {
    if (!NAVER_MAP_CLIENT_ID || naver.value) return
    if (!document.querySelector(`script[src="${NAVER_MAP_URL}"]`)) {
      const script = document.createElement("script")
      script.src = NAVER_MAP_URL
      document.head.appendChild(script)
      script.addEventListener("load", () => {
        naver.value = (window as any).naver
      })
    }
  })
  return naver
}

export function useKakao() {
  onMounted(() => {
    if (!KAKAO_SDK_JS_KEY || kakao.value) return
    if (!document.querySelector(`script[src="${KAKAO_SDK_URL}"]`)) {
      const script = document.createElement("script")
      script.addEventListener("load", () => {
        if (!(window as any).Kakao.isInitialized()) {
          ;(window as any).Kakao.init(KAKAO_SDK_JS_KEY)
        }
        kakao.value = (window as any).Kakao
      })
      script.src = KAKAO_SDK_URL
      document.head.appendChild(script)
    }
  })
  return kakao
}
