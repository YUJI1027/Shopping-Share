<template>
    <div class="w-full flex flex-col gap-3">
        <button 
            @click="toggleHide" 
            class="text-sm font-semibold text-gray-600 px-3 py-1.5 rounded-lg hover:bg-green-50 transition cursor-pointer"
        >
            {{ hideComplete ? '完了済み表示' : '完了済み非表示' }}
        </button>
    </div>
    
    <transition-group name="list" tag="div" class="flex flex-col gap-3">
        <ShoppingItem
            v-for="item in filteredItems"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :quantity="item.quantity"
            :memo="item.memo"
            :isDone="item.isDone"
            :doneBy="item.doneBy"
            :userName="item.userName"
            :createdAt="item.createdAt"
            @delete-item="handleDelete"
            @toggle-item="toggleItem"
            @edit-item="editItem"
        />
    </transition-group>
</template>

<script setup>
import { computed, ref } from 'vue'

// ========================
// コンポーネントのインポート
// ========================
import ShoppingItem from './ShoppingItem.vue'

// =======
// state
// =======
const hideComplete = ref(false)

// ==========================================
// Home.vueからitemsを受け取るためのpropsを定義
// ==========================================
const props = defineProps({
    items: Array
})

// =======================================================
// Home.vueに削除と切り替えのイベントを送信するためのemitを定義
// =======================================================
const emit = defineEmits([
    'delete-item',
    'toggle-item',
    'edit-memo',
    'edit-item'])

// =============================
// 完了済みを隠すための切り替え処理
// =============================
const toggleHide = () => {
    hideComplete.value = !hideComplete.value
}

// ============
// 削除の処理
// ============
const handleDelete = (id) => {
    emit('delete-item', id)
}

// =====================
// チェックの切り替え処理
// =====================
const toggleItem = (id, checked) => {
    emit('toggle-item', id, checked)
}

// ============================
// ソートされたアイテムを作成する
// ============================
const filteredItems = computed(() => {
    let sorted = [...props.items].sort(
        (a, b) => a.isDone -b.isDone
    )

    if (hideComplete.value) {
        return sorted.filter(
            item => item.isDone === false
        )
    }

    return sorted
})

// ============
// 編集の処理
// ============
const editItem =(item) => {
    emit("edit-item", item)
}
</script>
