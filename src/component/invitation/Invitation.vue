<script setup lang="ts">
import { ref } from "vue"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import Modal from "../modal/Modal.vue"
import Button from "../button/Button.vue"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import PhoneIcon from "../../icons/phone-flip-icon.svg"
import EnvelopeIcon from "../../icons/envelope-icon.svg"

const contactModalOpen = ref(false)

const callPhone = (phone: string) => window.open(`tel:${phone}`, "_self")
const sendSms = (phone: string) => window.open(`sms:${phone}`, "_self")
</script>

<template>
  <LazyDiv class="card invitation">
    <h2 class="english">Invitation</h2>

    <div class="break" />

    <div class="content">싱그러운 여름 향기 가득한 날</div>
    <div class="content">소중한 분들을 모시고</div>
    <div class="content">사랑의 약속을 하려고 합니다.</div>
    <div class="break" />
    <div class="content">햇살이 뜨거울 땐 가려주고,</div>
    <div class="content">비가 오면 우산이 되어주는</div>
    <div class="content">부부가 되겠습니다.</div>
    <div class="break" />
    <div class="content">기쁜날 함께 하시어</div>
    <div class="content">저희의 앞날을 축복해 주세요.</div>

    <div class="break" />

    <div class="name">
      {{ GROOM_FATHER }} · {{ GROOM_MOTHER }}
      <span class="relation"
        >의 <span class="relation-name">{{ GROOM_TITLE }}</span></span
      >
      {{ GROOM_FULLNAME }}
    </div>
    <div class="name">
      {{ BRIDE_FATHER }} · {{ BRIDE_MOTHER }}
      <span class="relation"
        >의 <span class="relation-name">{{ BRIDE_TITLE }}</span></span
      >
      {{ BRIDE_FULLNAME }}
    </div>

    <div class="break" />

    <Button @click="contactModalOpen = true">연락하기</Button>
  </LazyDiv>

  <Modal
    v-model:open="contactModalOpen"
    modal-class="contact-modal"
    :close-on-click-background="true"
  >
    <div class="header">
      <div class="title-group">
        <div class="title">축하 인사 전하기</div>
        <div class="subtitle">전화, 문자메세지로 축하 인사를 전해보세요.</div>
      </div>
    </div>

    <div class="content">
      <div class="contact-info">
        <template
          v-for="item in GROOM_INFO.filter((i) => !!i.phone)"
          :key="item.relation"
        >
          <div class="relation">{{ item.relation }}</div>
          <div>{{ item.name }}</div>
          <div>
            <PhoneIcon class="flip icon" @click="callPhone(item.phone)" />
            <EnvelopeIcon class="icon" @click="sendSms(item.phone)" />
          </div>
        </template>
      </div>
      <div class="contact-info">
        <template
          v-for="item in BRIDE_INFO.filter((i) => !!i.phone)"
          :key="item.relation"
        >
          <div class="relation">{{ item.relation }}</div>
          <div>{{ item.name }}</div>
          <div>
            <PhoneIcon class="flip icon" @click="callPhone(item.phone)" />
            <EnvelopeIcon class="icon" @click="sendSms(item.phone)" />
          </div>
        </template>
      </div>
    </div>
    <div class="footer">
      <Button
        button-style="style2"
        class="bg-light-grey-color text-dark-color"
        @click="contactModalOpen = false"
      >
        닫기
      </Button>
    </div>
  </Modal>
</template>
