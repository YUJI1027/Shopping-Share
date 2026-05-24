<template>
  <div v-if="visible" class="toast-message" :class="type">
    <p>{{ message }}</p>
    <button @click="closeToast">✖️</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ToastMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    const visible = ref(true);

    const closeToast = () => {
      visible.value = false;
    };

    watch(() => props.message, (newMessage) => {
      if (newMessage) {
        visible.value = true;
        setTimeout(closeToast, props.duration);
      }
    });

    return { visible, closeToast };
  }
});
</script>

<style scoped>
.toast-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff; /* ブルー基調 */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.toast-message p {
  margin: 0;
}

.toast-message button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 10px;
}
</style>