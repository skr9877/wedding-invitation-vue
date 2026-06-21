<script setup lang="ts">
import { ref } from "vue"
import Button from "../button/Button.vue"
import { SERVER_URL } from "../../env"

const RULES = {
  name: { maxLength: 10 },
  count: { min: 0, default: 1 },
}

const emit = defineEmits<{ close: [] }>()

const sideGroom = ref<HTMLInputElement | null>(null)
const sideBride = ref<HTMLInputElement | null>(null)
const nameInput = ref<HTMLInputElement | null>(null)
const mealYes = ref<HTMLInputElement | null>(null)
const mealUndecided = ref<HTMLInputElement | null>(null)
const mealNo = ref<HTMLInputElement | null>(null)
const countInput = ref<HTMLInputElement | null>(null)

const loading = ref(false)

const submit = async (e: Event) => {
  e.preventDefault()
  loading.value = true
  try {
    const side = sideGroom.value?.checked
      ? "groom"
      : sideBride.value?.checked
        ? "bride"
        : null
    const name = nameInput.value?.value ?? ""
    const meal = mealYes.value?.checked
      ? "yes"
      : mealUndecided.value?.checked
        ? "undecided"
        : mealNo.value?.checked
          ? "no"
          : null
    const count = Number(countInput.value?.value)

    if (!side) {
      alert("신랑 또는 신부를 선택해주세요.")
      return
    }
    if (!name) {
      alert("성함을 입력해주세요.")
      return
    }
    if (name.length > RULES.name.maxLength) {
      alert(`성함을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
      return
    }
    if (!meal) {
      alert("식사 여부를 선택해주세요.")
      return
    }
    if (isNaN(count)) {
      alert("참석 인원을 입력해주세요.")
      return
    }
    if (count < RULES.count.min) {
      alert(`참석 인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)
      return
    }

    const res = await fetch(`${SERVER_URL}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ side, name, meal, count }),
    })
    if (!res.ok) throw new Error(res.statusText)

    alert("참석 의사가 성공적으로 전달되었습니다.")
    emit("close")
  } catch {
    alert("참석 의사 전달에 실패했습니다.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form" @submit="submit">
    <div class="header">
      <div class="title">참석 의사 전달하기</div>
    </div>
    <div class="content">
      <div class="input-group">
        <div class="label">구분</div>
        <div class="select-input">
          <label>
            <input
              :disabled="loading"
              type="radio"
              name="side"
              value="groom"
              hidden
              checked
              ref="sideGroom"
            />
            <span>신랑</span>
          </label>
          <label>
            <input
              :disabled="loading"
              type="radio"
              name="side"
              value="bride"
              hidden
              ref="sideBride"
            />
            <span>신부</span>
          </label>
        </div>
      </div>

      <div class="input-group">
        <div class="label">성함</div>
        <div class="input">
          <input
            :disabled="loading"
            type="text"
            placeholder="참석자 성함을 입력해주세요."
            :maxlength="RULES.name.maxLength"
            ref="nameInput"
          />
        </div>
      </div>

      <div class="input-group">
        <div class="label">식사</div>
        <div class="radio-input">
          <label>
            <input
              :disabled="loading"
              type="radio"
              name="meal"
              value="yes"
              ref="mealYes"
            />
            <span>예정</span>
          </label>
          <label>
            <input
              :disabled="loading"
              type="radio"
              name="meal"
              value="undecided"
              ref="mealUndecided"
            />
            <span>미정</span>
          </label>
          <label>
            <input
              :disabled="loading"
              type="radio"
              name="meal"
              value="no"
              ref="mealNo"
            />
            <span>불참</span>
          </label>
        </div>
      </div>

      <div class="input-group">
        <div class="label">참석 인원 (본인 포함)</div>
        <div>
          <input
            :disabled="loading"
            type="number"
            :min="RULES.count.min"
            :value="RULES.count.default"
            ref="countInput"
          />
          명
        </div>
      </div>
    </div>
    <div class="footer">
      <Button button-style="style2" :disabled="loading" type="submit">
        전달하기
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
