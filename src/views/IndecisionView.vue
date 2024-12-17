import ChatMessages from '@/components/chat/ChatMessages.vue';
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Mi esposa</span>
    </div>

    <!-- chat Messages -->
    <ChatMessages :messages="messages" />

    <!-- Message Box -->
    <!-- Cuando se recibe el emit, con @send-message, se ejecuta la función -->
    <MessageBox @text-message="addMessage" />
  </div>
</template>

<script lang="ts" setup>
  import type { IChatMessages } from '@/interfaces/chat-message.interfaces.ts';
  import { ref } from 'vue';
  import ChatMessages from '@/components/chat/ChatMessages.vue';
  import MessageBox from '@/components/chat/MessageBox.vue';

  const messages = ref<IChatMessages[]>([
    {
      id: new Date().getTime(),
      message: 'Hola Mundo',
      itsMine: true,
    },
    {
      id: new Date().getTime(),
      message: '¿Quieres ir a tomar café',
      itsMine: true,
    },
    {
      id: new Date().getTime() + 1,
      message: 'Si',
      itsMine: false,
      image: 'https://yesno.wtf/assets/no/32-b62f1f8058c1d7f06c528319faccfb38.gif',
    },
  ]);

  const addMessage = (text: string) => {
    messages.value.push({
      id: new Date().getTime() + 1,
      itsMine: true,
      message: text,
    });
  };
</script>
