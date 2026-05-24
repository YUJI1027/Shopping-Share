<template>
    <transition name="toast">
        <div v-if="visible" class="toast">
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
defineProps({
    message: String,
    visible: Boolean
})
</script>

<style scoped>
.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 18px;
    border-radius: 8px;
    font-size:  15px;
    z-index: 2000;
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease, transform  0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%);
}
</style>