<template>
    <header class="header">
    <div class="left">
        <span class="logo" aria-hidden="true">🛒</span>
        <h1 class="title">Shopping Share</h1>
    </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

// ========================
// state
// ========================
const router = useRouter()

</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background-color: #e6f9ea;
    padding: 10px 16px;
    border-radius: 8px;
}

.left {
    display: flex;
    align-items: center;
    gap: 8px;
}
.logo {
    font-size: 1.25rem;
    line-height: 1;
}
.title {
    margin: 0;
    font-weight: 700;
    font-size: 1.05rem;
    color: #064e2a;
}
</style>