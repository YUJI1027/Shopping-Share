<template>
  <header class="app-header">
    <h1 class="app-title">買い物リスト</h1>
    <nav class="app-nav">
      <ul>
        <li><a href="#home">ホーム</a></li>
        <li><a href="#about">アバウト</a></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header',
}
</script>

<style scoped>
.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: center;
}

.app-title {
  margin: 0;
  font-size: 2rem;
}

.app-nav ul {
  list-style: none;
  padding: 0;
}

.app-nav li {
  display: inline;
  margin: 0 1rem;
}

.app-nav a {
  color: white;
  text-decoration: none;
}

.app-nav a:hover {
  text-decoration: underline;
}
</style>