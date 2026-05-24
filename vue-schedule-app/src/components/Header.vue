<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">スケジュールアプリ</h1>
      <nav class="nav-links">
        <router-link to="/" class="nav-link">ホーム</router-link>
        <router-link to="/calendar" class="nav-link">カレンダー</router-link>
        <router-link to="/settings" class="nav-link">設定</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header',
};
</script>

<style scoped>
.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
}

.app-title {
  margin: 0;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>