<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import Button from "../button/Button.vue"
import Modal from "../modal/Modal.vue"
import DeleteGuestBookModal from "./DeleteGuestBookModal.vue"
import { dayjs } from "../../const"
import offlineGuestBook from "./offlineGuestBook.json"
import { SERVER_URL } from "../../env"

const PAGES_PER_BLOCK = 5
const POSTS_PER_PAGE = 5

type Post = {
  id: number
  timestamp: number
  name: string
  content: string
}

const props = defineProps<{
  loadPosts: () => void
}>()

const emit = defineEmits<{ close: [] }>()

const posts = ref<Post[]>([])
const currentPage = ref(0)
const totalPages = ref(1)
const deleteModalOpen = ref(false)
const deletePostId = ref<number | null>(null)

const loadPage = async (page: number) => {
  currentPage.value = page
  if (SERVER_URL) {
    try {
      const offset = page * POSTS_PER_PAGE
      const res = await fetch(
        `${SERVER_URL}/guestbook?offset=${offset}&limit=${POSTS_PER_PAGE}`,
      )
      if (res.ok) {
        const data = await res.json()
        const total = Math.ceil(data.total / POSTS_PER_PAGE)
        if (page !== 0 && page >= total) {
          loadPage(total - 1)
          return
        }
        posts.value = data.posts
        totalPages.value = total
      }
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  } else {
    posts.value = offlineGuestBook.slice(
      page * POSTS_PER_PAGE,
      (page + 1) * POSTS_PER_PAGE,
    )
    totalPages.value = Math.ceil(offlineGuestBook.length / POSTS_PER_PAGE)
  }
}

onMounted(() => loadPage(0))

const pages = computed(() => {
  const start =
    Math.floor(currentPage.value / PAGES_PER_BLOCK) * PAGES_PER_BLOCK
  const end = Math.min(start + PAGES_PER_BLOCK, totalPages.value)
  return Array.from({ length: end - start }).map((_, index) => index + start)
})

const openDeleteModal = (postId: number) => {
  if (!SERVER_URL) return
  deletePostId.value = postId
  deleteModalOpen.value = true
}
</script>

<template>
  <div class="header">
    <div class="title">방명록 전체보기</div>
  </div>
  <div class="content">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="heading">
        <div class="close-button" @click="openDeleteModal(post.id)" />
      </div>
      <div class="body">
        <div class="title">
          <div class="name">{{ post.name }}</div>
          <div class="date">
            {{ dayjs.unix(post.timestamp).format("YYYY-MM-DD") }}
          </div>
        </div>
        <div class="content">{{ post.content }}</div>
      </div>
    </div>

    <div class="break" />

    <div class="pagination">
      <div
        v-if="pages[0] > 0"
        class="page"
        @click="loadPage(pages[0] - 1)"
      >
        이전
      </div>
      <div
        v-for="page in pages"
        :key="page"
        :class="`page${page === currentPage ? ' current' : ''}`"
        @click="() => { if (page !== currentPage) loadPage(page) }"
      >
        {{ page + 1 }}
      </div>
      <div
        v-if="pages[pages.length - 1] < totalPages - 1"
        class="page"
        @click="loadPage(pages[pages.length - 1] + 1)"
      >
        다음
      </div>
    </div>
  </div>
  <div class="footer">
    <Button
      button-style="style2"
      class="bg-light-grey-color text-dark-color"
      @click="emit('close')"
    >
      닫기
    </Button>
  </div>

  <Modal
    v-model:open="deleteModalOpen"
    modal-class="delete-guestbook-modal"
    :close-on-click-background="false"
    :show-close-button="false"
  >
    <DeleteGuestBookModal
      :post-id="deletePostId"
      @success="
        () => {
          deleteModalOpen = false
          props.loadPosts()
          loadPage(currentPage)
        }
      "
      @cancel="deleteModalOpen = false"
    />
  </Modal>
</template>
