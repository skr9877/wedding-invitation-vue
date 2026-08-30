<script setup lang="ts">
import { ref, onMounted } from "vue"
import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import Button from "../button/Button.vue"
import Modal from "../modal/Modal.vue"
import AttendanceFormModal from "./AttendanceFormModal.vue"
import HeartIcon from "../../icons/heart-icon.svg"
import CalendarIcon from "../../icons/calendar-icon.svg"
import MarkerIcon from "../../icons/marker-icon.svg"
import { SERVER_URL } from "../../env"

const now = dayjs()
const showSection = !!SERVER_URL && !WEDDING_DATE.isBefore(now)

const attendanceInfoOpen = ref(false)
const attendanceFormOpen = ref(false)

onMounted(() => {
  if (!showSection) return
  attendanceInfoOpen.value = true
})
</script>

<template>
  <template v-if="showSection">
    <div class="info-card">
      <div class="label">참석 의사 전달</div>
      <div class="content">
        신랑, 신부에게 참석의사를<br />
        미리 전달할 수 있어요.
      </div>

      <div class="break" />

      <Button
        class="attendance-button"
        style="width: 100%"
        @click="attendanceFormOpen = true"
      >
        참석 의사 전달하기
      </Button>
    </div>

    <Modal
      v-model:open="attendanceInfoOpen"
      modal-class="attendance-info-modal"
      :close-on-click-background="true"
    >
      <div class="header">
        <div class="title">참석 의사 전달 안내</div>
      </div>
      <div class="content">
        <div class="info-message">
          축하의 마음으로 참석해주시는<br />
          모든 분들을 귀하게 모실 수 있도록<br />
          참석 및 식사 여부를 미리 여쭙고자 합니다.
          <div class="break" />
          부담없이 알려주시면<br />
          정성껏 준비하겠습니다.
        </div>
        <div class="wedding-info">
          <HeartIcon class="heart" /> 신랑 {{ GROOM_FULLNAME }} &amp; 신부
          {{ BRIDE_FULLNAME }}<br />
          <CalendarIcon /> {{ WEDDING_DATE.format(WEDDING_DATE_FORMAT) }}<br />
          <MarkerIcon /> {{ LOCATION }}
        </div>
      </div>
      <div class="footer">
        <Button
          class="attendance-button"
          button-style="style2"
          @click="
            () => {
              attendanceInfoOpen = false
              attendanceFormOpen = true
            }
          "
        >
          참석 의사 전달하기
        </Button>
        <Button
          button-style="style2"
          class="bg-light-grey-color text-dark-color"
          @click="attendanceInfoOpen = false"
        >
          닫기
        </Button>
      </div>
    </Modal>

    <Modal
      v-model:open="attendanceFormOpen"
      modal-class="attendance-form-modal"
      :close-on-click-background="true"
    >
      <AttendanceFormModal @close="attendanceFormOpen = false" />
    </Modal>
  </template>
</template>
