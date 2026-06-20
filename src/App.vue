<template>
  <div class="flex flex-col min-h-screen">
    <router-view />

    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from './components/AppFooter.vue'
</script>