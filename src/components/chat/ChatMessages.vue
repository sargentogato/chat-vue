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
          Cuando ponemos v-bind="message" estamos desestructurando el objeto
          cuando el hijo lo reciba, podrá acceder a sus propiedades de manera directa
        -->
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        v-bind="message"
      />
      <!-- message es un objeto que se pasa a ChatBubble Podemos pasasr
        :message="message.message"
        :its-mine="message.itsMine"
        :image="message.image"
        cada prop de manera individual o pasar el objeto completo
        y en el componente hijo, al recibirlo, tenemos acceso directo a las
        propiedades
      -->
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
  // array de objetos

  /* esto es lo mismo que esto, arriba hacemos el destructuring
      para no definir props y luego acceder a su propieadad messages
      const props = defineProps<IProps>();
      const messages = props.messages;
  */

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
