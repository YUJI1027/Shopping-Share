<template>
    <div
        v-for="(groupItems, category) in groupedItems"
        :key="category"
        class="flex flex-col gap-2"
        
    >
        <span class="text-xs font-bold text-gray-500 px-1">
            {{ category }} ({{ groupItems.length }})
        </span>

        <transition-group name="list" tag="div" class="flex flex-col gap-3">
            <ShoppingItem
                v-for="item in groupItems"
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
    </div>
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
const categoryOrder = ['野菜', '肉・魚', '日用品', '飲料', 'お菓子', '調味料', 'その他', '未分類']  //カテゴリーの表示順（固定化）

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

// ==============================
// カテゴリーごとにグルーピングする
// ==============================
const groupedItems = computed(() => {
    const groups = {}

    for  (const item of filteredItems.value) {
        const cat = item.category || '未分類'
        if (!groups[cat]) groups[cat] = []
            groups[cat].push(item)
    }

    const sortedEntries = Object.entries(groups).sort(([a], [b]) => {
        const indexA = categoryOrder.indexOf(a)
        const indexB = categoryOrder.indexOf(b)

        const posA = indexA === -1 ? categoryOrder.length : indexA
        const posB = indexB === -1 ? categoryOrder.length : indexB

        return posA - posB
    })

    return Object.fromEntries(sortedEntries)
})
</script>
