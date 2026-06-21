<script setup lang="ts">
import { ref } from "vue"
import Button from "../button/Button.vue"
import { SERVER_URL } from "../../env"

const RULES = {
  name: { maxLength: 10 },
  content: { maxLength: 100 },
  password: { minLength: 4, maxLength: 20 },
}

const props = defineProps<{
  loadPosts: () => void
}>()

const emit = defineEmits<{ close: [] }>()

const nameInput = ref<HTMLInputElement | null>(null)
const contentInput = ref<HTMLTextAreaElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)

const submit = async (e: Event) => {
  e.preventDefault()
  loading.value = true
  try {
    const name = (nameInput.value?.value ?? "").trim()
    const content = (contentInput.value?.value ?? "").trim()
    const password = passwordInput.value?.value ?? ""

    if (!name) {
      alert("이름을 입력해주세요.")
      return
    }
    if (name.length > RULES.name.maxLength) {
      alert(`이름을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
      return
    }
    if (!content) {
      alert("내용을 입력해주세요.")
      return
    }
    if (content.length > RULES.content.maxLength) {
      alert(`내용을 ${RULES.content.maxLength}자 이하로 입력해주세요.`)
      return
    }
    if (password.length < RULES.password.minLength) {
      alert(`비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`)
      return
    }

    const res = await fetch(`${SERVER_URL}/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, content, password }),
    })
    if (!res.ok) throw new Error(res.statusText)

    alert("방명록 작성이 완료되었습니다.")
    emit("close")
    props.loadPosts()
  } catch {
    alert("방명록 작성에 실패했습니다.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form" @submit="submit">
    <div class="header">
      <div class="title-group">
        <div class="title">방명록 작성하기</div>
        <div class="subtitle">신랑, 신부에게 축하의 마음을 전해주세요.</div>
      </div>
    </div>
    <div class="content">
      이름
      <input
        :disabled="loading"
        type="text"
        placeholder="이름을 입력해주세요."
        ref="nameInput"
        :maxlength="RULES.name.maxLength"
      />
      내용
      <textarea
        :disabled="loading"
        placeholder="축하 메세지를 100자 이내로 입력해주세요."
        ref="contentInput"
        :maxlength="RULES.content.maxLength"
      />
      비밀번호
      <input
        :disabled="loading"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        ref="passwordInput"
        :maxlength="RULES.password.maxLength"
      />
    </div>
    <div class="footer">
      <Button button-style="style2" :disabled="loading" type="submit">
        저장하기
      </Button>
      <Button
        button-style="style2"
        type="button"
        class="bg-light-grey-color text-dark-color"
        @click="emit('close')"
      >
        닫기
      </Button>
    </div>
  </form>
</template>
