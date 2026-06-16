<template>
    <transition name="toast">
        <div 
            v-if="visible" 
            class="fixed bottom-7 left-1/2 -translate-x-1/2 z-[2000] px-5 py-3 bg-gray-900/90 text-white text-sm  font-medium shadow-xl backdrop-blur-sm animate-slide-up whitespace-nowrap"
        >
            {{ message }}
        </div>
    </transition>
</template>

<script setup>
// ========
// Props
// ========
defineProps({
    message: String,
    visible: Boolean
})
</script>
