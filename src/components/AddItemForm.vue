<template>
    <div 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-back/30 backdrop-blur-sm" 
        @click.self="$emit('close')" 
        role="dialog" 
        aria-modal="true"
    >
        <div 
            class="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex-col gap-[4px] animate-fade-up" 
            @keydown.enter="AddItem" 
            tabindex="1"
        >
            <h3 class="mb-4 text-lg font-bold text-gray-900">
                {{ editingItem ? "お買い物を編集する" : "お買い物を登録する" }}
            </h3>

            <input 
                inputmode="text"
                v-model="item"
                placeholder="商品名"
                class="w-full px-4 py-3 rounded-xl border  border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
            />

            <input 
                v-model.number="quantity"
                type="number"
                min="1"
                placeholder="数量"
                class="mt-3 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
            />

            <textarea 
                v-model="memo"
                placeholder="メモ"
                class="mt-3 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition min-h-[88px] resize-y"
            >
            </textarea>

            <div class="flex gap-2 justify-end mt-1">
                <button 
                    @click="AddItem" 
                    class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                >
                    {{ editingItem ? "更新" : "登録" }}    
                </button>

                <button 
                    @click="$emit('close')" 
                    class="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                >
                    キャンセル    
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

// ========
// state
// ========
const item = ref('')
const quantity  = ref(1)
const memo = ref('')

const props = defineProps({
    editingItem:  Object
})

// ============
// アイテム追加
// ============
const emit = defineEmits(['add-item'])
const AddItem = () => {
    if (!item.value.trim()) return

    // Home.vueにデータを送信する
    emit('add-item', item.value, quantity.value, memo.value)
    item.value = ''
    quantity.value = 1
    memo.value = ''
}

// ==================
// 編集アイテムの反映
// ==================
watch(
    () => props.editingItem,
    async (editingItem) => {
        await nextTick()
        if (!editingItem) return

        item.value = editingItem.name
        quantity.value = editingItem.quantity
        memo.value = editingItem.memo || ''
    },
    { immediate: true}
)

</script>