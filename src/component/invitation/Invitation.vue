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

    <div class="content">삶의 <bold>희</bold>노애락을 속삭이는 부부라는 이름으로</div>
    <div class="content">보<bold>석</bold>처럼 반짝이는 추억들을 한아름 안고</div>
    <div class="content">끝없이 이어진 세월의 길을 다<bold>정</bold>히 걸어가려 합니다.</div>
    <div class="content">서로의 거친 숨을 기다려주는 <bold>안</bold>온한 쉼이 되어주며</div>
    <div class="content">'다름'이 '닮음'이 되어가는 사랑으로</div>
    <div class="content">언제고 언제까지나 늘 함께임을 약속하려 합니다.</div>
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

    <Button class="contact-button" @click="contactModalOpen = true"
      >연락하기</Button
    >
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
