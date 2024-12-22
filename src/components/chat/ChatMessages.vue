<template>
  <div
    ref="chatRef"
    class="flex-1 overflow-y-auto p-4"
  >
    <!-- ref es una referencia al elemento, es algo de vue -->
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
  import { watch, ref, nextTick } from 'vue';
  import ChatBubble from '@/components/chat/ChatBubble.vue';
  import type { IChatMessages } from '../../interfaces/chat-message.interfaces';

  interface IProps {
    messages: IChatMessages[];
  }

  const { messages } = defineProps<IProps>();

  const chatRef = ref<HTMLDivElement | null>(null);

  /* Estoy utiliznado un getter */

  watch(
    () => messages,
    async () => {
      await nextTick();

      chatRef.value?.scrollTo({
        top: chatRef.value.scrollHeight,
        behavior: 'smooth',
      });
    },
    { deep: true },
  );
</script>

<style lang="scss" scoped></style>
