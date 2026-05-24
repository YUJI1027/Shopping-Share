<template>
  <aside class="sidebar">
    <h2>ナビゲーション</h2>
    <ul>
      <li @click="navigateToHome" :class="{ active: isActive('home') }">ホーム</li>
      <li @click="navigateToCalendar" :class="{ active: isActive('calendar') }">カレンダー</li>
      <li @click="navigateToSettings" :class="{ active: isActive('settings') }">設定</li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const router = useRouter();

    const navigateToHome = () => {
      router.push({ name: 'Home' });
    };

    const navigateToCalendar = () => {
      router.push({ name: 'CalendarView' });
    };

    const navigateToSettings = () => {
      router.push({ name: 'Settings' });
    };

    const isActive = (routeName: string) => {
      return router.currentRoute.value.name === routeName;
    };

    return {
      navigateToHome,
      navigateToCalendar,
      navigateToSettings,
      isActive,
    };
  },
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f0f4ff; /* ブルー基調 */
  padding: 20px;
  border-right: 1px solid #e0e0e0;
}

.sidebar h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar li:hover {
  background-color: #e0e7ff; /* ホバー時の色 */
}

.sidebar li.active {
  font-weight: bold;
  color: #1e3a8a; /* アクティブなリンクの色 */
}
</style>