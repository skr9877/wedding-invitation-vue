<script setup lang="ts">
import { ref } from "vue"
import { BRIDE_INFO, GROOM_INFO } from "../../const"
import { STATIC_ONLY } from "../../env"
import Button from "../button/Button.vue"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import Modal from "../modal/Modal.vue"
import Attendance from "./Attendance.vue"

const donationModalOpen = ref(false)
const isGroom = ref(true)

const openDonationModal = (groom: boolean) => {
  isGroom.value = groom
  donationModalOpen.value = true
}

const copyAccount = async (account: string) => {
  try {
    await navigator.clipboard.writeText(account)
    alert(account + "\n복사되었습니다.")
  } catch {
    alert("복사에 실패했습니다.")
  }
}
</script>

<template>
  <template v-if="STATIC_ONLY">
    <LazyDiv class="card information">
      <h2 class="english">Information</h2>
      <div class="info-card">
        <div class="label">식사 안내</div>
        <div class="content">
          식사시간: 12시 30분 ~ 14시 30분<br />
          장소: 지하 1층 연회장
        </div>
      </div>
    </LazyDiv>

    <LazyDiv class="card information">
      <div class="info-card">
        <div class="label">마음 전하기</div>
        <div class="content">
          참석이 어려워 직접 축하해주지 못하는<br />
          분들을 위해 계좌번호를 기재하였습니다.<br />
          넓은 마음으로 양해 부탁드립니다.
        </div>

        <div class="break" />

        <Button style="width: 100%" @click="openDonationModal(true)">
          신랑측 계좌번호 보기
        </Button>
        <div class="break" />
        <Button style="width: 100%" @click="openDonationModal(false)">
          신부측 계좌번호 보기
        </Button>
      </div>
    </LazyDiv>
  </template>

  <LazyDiv v-else class="card information">
    <h2 class="english">Information</h2>
    <div class="info-card">
      <div class="label">식사 안내</div>
      <div class="content">
        식사시간: 12시 30분 ~ 14시 30분<br />
        장소: 지하 1층 연회장
      </div>
    </div>

    <div class="info-card">
      <div class="label">마음 전하기</div>
      <div class="content">
        참석이 어려워 직접 축하해주지 못하는<br />
        분들을 위해 계좌번호를 기재하였습니다.<br />
        넓은 마음으로 양해 부탁드립니다.
      </div>

      <div class="break" />

      <Button
        class="account-button"
        style="width: 100%"
        @click="openDonationModal(true)"
      >
        신랑측 계좌번호 보기
      </Button>
      <div class="break" />
      <Button
        class="account-button"
        style="width: 100%"
        @click="openDonationModal(false)"
      >
        신부측 계좌번호 보기
      </Button>
    </div>

    <Attendance />
  </LazyDiv>

  <Modal
    v-model:open="donationModalOpen"
    modal-class="donation-modal"
    :close-on-click-background="true"
  >
    <div class="header">
      <div class="title">
        {{ isGroom ? "신랑측 계좌번호" : "신부측 계좌번호" }}
      </div>
    </div>
    <div class="content">
      <div
        v-for="item in (isGroom ? GROOM_INFO : BRIDE_INFO).filter(
          (i) => !!i.account,
        )"
        :key="item.relation"
        class="account-info"
      >
        <div>
          <div class="name">
            <span class="relation">{{ item.relation }}</span> {{ item.name }}
          </div>
          <div>{{ item.account }}</div>
        </div>
        <Button class="copy-button" @click="copyAccount(item.account)">
          복사하기
        </Button>
      </div>
    </div>
    <div class="footer">
      <Button
        button-style="style2"
        class="bg-light-grey-color text-dark-color"
        @click="donationModalOpen = false"
      >
        닫기
      </Button>
    </div>
  </Modal>
</template>
