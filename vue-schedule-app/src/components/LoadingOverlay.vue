<template>
  <div class="loading-overlay" v-if="isLoading">
    <div class="spinner"></div>
    <p class="loading-text">読み込み中...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'LoadingOverlay',
  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff; /* ブルー基調 */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 10px;
  font-size: 16px;
  color: #007bff; /* ブルー基調 */
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>