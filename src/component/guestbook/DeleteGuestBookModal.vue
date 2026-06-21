<script setup lang="ts">
import { ref } from "vue"
import Button from "../button/Button.vue"
import { SERVER_URL } from "../../env"

const RULES = {
  password: { minLength: 4, maxLength: 20 },
}

const props = defineProps<{
  postId: number | null
}>()

const emit = defineEmits<{
  success: []
  cancel: []
}>()

const passwordInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)

const submit = async (e: Event) => {
  e.preventDefault()
  if (props.postId === null) return
  loading.value = true
  try {
    const password = passwordInput.value?.value ?? ""
    if (!password || password.length < RULES.password.minLength) {
      alert(`비밀번호를 ${RULES.password.minLength}자 이상 입력해주세요.`)
      return
    }

    const result = await fetch(`${SERVER_URL}/guestbook`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.postId, password }),
    })

    if (!result.ok) {
      if (result.status === 403) {
        alert("비밀번호가 일치하지 않습니다.")
      } else {
        alert("방명록 삭제에 실패했습니다.")
      }
      return
    }

    alert("삭제되었습니다.")
    emit("success")
  } catch {
    alert("방명록 삭제에 실패했습니다.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form v-if="postId !== null" class="form" @submit="submit">
    <div class="header">
      <div class="title">삭제하시겠습니까?</div>
    </div>
    <div class="content">
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
        삭제하기
      </Button>
      <Button
        button-style="style2"
        type="button"
        class="bg-light-grey-color text-dark-color"
        @click="emit('cancel')"
      >
        닫기
      </Button>
    </div>
  </form>
</template>
