<template>
  <div
    data-test-itsMine
    v-if="itsMine"
    class="flex justify-end"
  >
    <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">{{ message }}</div>
  </div>

  <div
    v-else
    class="flex"
  >
    <div
      data-test-itsNotMine
      class="bg-gray-300 text-black p-2 rounded-lg max-w-xs"
    >
      <span class="capitalize">{{ message }}</span>
      <img
        v-if="image"
        :src="image"
        alt="profile"
        class="w-52 h-52 object-cover rounded-md"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface IProps {
    message: string;
    itsMine: boolean;
    image?: string;
  }

  const props = defineProps<IProps>();
  /* Podemos poner defineProps a secas o meterlo en una variable, de ambas formas
    podemos acceder en el template a las propiedades directamente, sin necesidad de poner
    props.message (objeto.propiedad). Pero si queremos usarlo dentre del script, si que será necesario
    poner props.propiedad o podemos hacer destructuring
  */
  const { message } = props; //esto es para que no marque el error de que la variable no ha sido asignada
</script>

<style lang="scss" scoped></style>
