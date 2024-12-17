<template>
  <div class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->

      <!--
        Esta es la forma antigua
        :message="message.message"
        :itsMine="message.itsMine"
        :image="message.image"
      -->
      <!--
          ahora con sólo poner v-bind="message" podemos acceder a todos los valores
          del obeto
        -->
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        v-bind="message"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ChatBubble from '@/components/chat/ChatBubble.vue'
  import { IChatMessages } from '../../interfaces/chat-message.interfaces'

  interface IProps {
    messages: IChatMessages[]
  }

  defineProps<IProps>()
</script>

<style lang="scss" scoped></style>
