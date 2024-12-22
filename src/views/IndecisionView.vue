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
  import ChatMessages from '@/components/chat/ChatMessages.vue';
  import MessageBox from '@/components/chat/MessageBox.vue';
  import { useChat } from '@/composables/useChat';

  const { messages, addMessage } = useChat();
</script>
