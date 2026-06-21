<script setup lang="ts">
import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL
const kakao = useKakao()

const share = () => {
  if (!kakao.value) return

  kakao.value.Share.sendDefault({
    objectType: "location",
    address: SHARE_ADDRESS,
    addressTitle: SHARE_ADDRESS_TITLE,
    content: {
      title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
      description: WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
      imageUrl:
        window.location.protocol +
        "//" +
        window.location.host +
        baseUrl +
        "/preview_image.png",
      link: {
        mobileWebUrl:
          window.location.protocol + "//" + window.location.host + baseUrl,
        webUrl:
          window.location.protocol + "//" + window.location.host + baseUrl,
      },
    },
    buttons: [
      {
        title: "초대장 보기",
        link: {
          mobileWebUrl:
            window.location.protocol + "//" + window.location.host + baseUrl,
          webUrl:
            window.location.protocol + "//" + window.location.host + baseUrl,
        },
      },
    ],
  })
}
</script>

<template>
  <LazyDiv class="footer share-button">
    <button class="ktalk-share" @click="share">
      <img :src="ktalkIcon" alt="ktalk-icon" /> 카카오톡으로 공유하기
    </button>
  </LazyDiv>
</template>
