<template>
  <div class="default-layout">
    <Header />
    <div class="layout-content">
      <Sidebar />
      <main>
        <router-view />
      </main>
    </div>
    <TopBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/TopBar.vue';

export default defineComponent({
  components: {
    Header,
    Sidebar,
    TopBar,
  },
});
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-content {
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9; /* 背景色を設定 */
}
</style>