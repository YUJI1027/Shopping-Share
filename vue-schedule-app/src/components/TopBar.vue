<template>
  <div class="top-bar">
    <div class="logo">
      <h1>アプリ名</h1>
    </div>
    <div class="actions">
      <button @click="$router.push('/settings')" class="settings-button">設定</button>
      <button @click="logout" class="logout-button">ログアウト</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from '../composables/useAuth';

export default defineComponent({
  setup() {
    const { logout } = useAuth();

    return {
      logout,
    };
  },
});
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
}

.actions {
  display: flex;
  gap: 10px;
}

.settings-button,
.logout-button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.settings-button:hover,
.logout-button:hover {
  text-decoration: underline;
}
</style>