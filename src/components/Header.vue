<template>
    <header class="w-full bg-white/80 backdrop-blur-md border-b border-green-100 px-4 py-3 flex items-center justify-between gap-3 shadow-sm rounded-xl">
        <div class="flex items-center gap-2">
            <span class="text-2xl leading-none" aria-hidden="true">🛒</span>
            <h1 class="text-base font-bold tracking-tight text-green-900">Shopping Share</h1>
        </div>

        <button 
            @click="$emit('open-notifications')"
            class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-50 transition cursor-pointer bg-transparent border-none"
            aria-label="お知らせ"
        >
            <span class="text-xl leading-none">🔔</span>
            <span 
                v-if="hasUnread"
                class="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"
            ></span>
        </button>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

// =========
// state
// =========
const router = useRouter()

// =========
// props
// =========
defineEmits(['open-notifications'])

</script>