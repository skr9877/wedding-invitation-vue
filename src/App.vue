<script setup lang="ts">
import BGEffect from "./component/bgEffect/BGEffect.vue"
import Cover from "./component/cover/Cover.vue"
import Invitation from "./component/invitation/Invitation.vue"
import Calendar from "./component/calendar/Calendar.vue"
import Gallery from "./component/gallery/Gallery.vue"
import Location from "./component/location/Location.vue"
import Information from "./component/information/Information.vue"
import GuestBook from "./component/guestbook/GuestBook.vue"
import ShareButton from "./component/shareButton/ShareButton.vue"
import LazyDiv from "./component/lazyDiv/LazyDiv.vue"
import ModalProvider from "./component/modal/ModalProvider.vue"
import { STATIC_ONLY } from "./env"
</script>

<template>
  <ModalProvider>
    <div class="background">
      <BGEffect />
      <div class="card-view">
        <LazyDiv class="card-group">
          <Cover />
          <Invitation />
        </LazyDiv>

        <LazyDiv class="card-group">
          <Calendar />
          <Gallery />
        </LazyDiv>

        <LazyDiv class="card-group">
          <Location />
        </LazyDiv>

        <LazyDiv class="card-group">
          <Information />
          <GuestBook v-if="!STATIC_ONLY" />
        </LazyDiv>

        <ShareButton />
      </div>
    </div>
  </ModalProvider>
</template>
