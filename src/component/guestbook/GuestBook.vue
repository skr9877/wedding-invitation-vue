<script setup lang="ts">
import { ref, onMounted } from "vue"
import Button from "../button/Button.vue"
import { dayjs } from "../../const"
import LazyDiv from "../lazyDiv/LazyDiv.vue"
import Modal from "../modal/Modal.vue"
import WriteGuestBookModal from "./WriteGuestBookModal.vue"
import GuestBookListModal from "./GuestBookListModal.vue"
import DeleteGuestBookModal from "./DeleteGuestBookModal.vue"
import offlineGuestBook from "./offlineGuestBook.json"
import { SERVER_URL } from "../../env"

type Post = {
  id: number
  timestamp: number
  name: string
  content: string
}

const posts = ref<Post[]>([])
const guestbookListModalOpen = ref(false)
const deleteModalOpen = ref(false)
const deletePostId = ref<number | null>(null)
const writeModalOpen = ref(false)

const loadPosts = async () => {
  if (SERVER_URL) {
    try {
      const res = await fetch(`${SERVER_URL}/guestbook?offset=${0}&limit=${3}`)
      if (res.ok) {
        const data = await res.json()
        posts.value = data.posts
      }
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  } else {
    posts.value = offlineGuestBook.slice(0, 3)
  }
}

onMounted(() => loadPosts())

const openDeleteModal = async (postId: number) => {
  if (!SERVER_URL) return
  deletePostId.value = postId
  deleteModalOpen.value = true
}
</script>

<template>
  <LazyDiv class="card guestbook">
    <h2 class="english">Guest Book</h2>

    <div class="break" />

    <div v-for="post in posts" :key="post.id" class="post">
      <div class="heading">
        <button class="close-button" @click="openDeleteModal(post.id)" />
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

    <template v-if="SERVER_URL">
      <Button class="guestbook-button" @click="writeModalOpen = true"
        >방명록 작성하기</Button
      >
      <div class="break" />
    </template>

    <Button
      class="guestbook-button"
      @click="guestbookListModalOpen = true"
    >
      방명록 전체보기
    </Button>
  </LazyDiv>

  <Modal
    v-model:open="guestbookListModalOpen"
    modal-class="guestbook-list-modal"
    :close-on-click-background="true"
  >
    <GuestBookListModal
      :load-posts="loadPosts"
      @close="guestbookListModalOpen = false"
    />
  </Modal>

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
          loadPosts()
        }
      "
      @cancel="deleteModalOpen = false"
    />
  </Modal>

  <Modal
    v-model:open="writeModalOpen"
    modal-class="write-guestbook-modal"
    :close-on-click-background="false"
  >
    <WriteGuestBookModal
      :load-posts="loadPosts"
      @close="writeModalOpen = false"
    />
  </Modal>
</template>
