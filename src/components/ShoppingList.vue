<template>
    <div class="header-actions">
        <button @click="toggleHide" class="btn-link toggle-btn">
            {{ hideComplete ? '完了済み表示' : '完了済み非表示' }}
        </button>
    </div>
    <div style="width: 100%;">
        <transition-group name="list" tag="div">
            <div class="items-grid">
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
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// ============
// コンポーネントのインポート
// ============
import ShoppingItem from './ShoppingItem.vue'

// ============
// state
// ============
const hideComplete = ref(false)

// ============
// Home.vueからitemsを受け取るためのpropsを定義
// ============
const props = defineProps({
    items: Array
})

// ============
// Home.vueに削除と切り替えのイベントを送信するためのemitを定義
// ============
const emit = defineEmits([
    'delete-item',
    'toggle-item',
    'edit-memo',
    'edit-item'])

// ============
// 完了済みを隠すための切り替え処理
// ============
const toggleHide = () => {
    hideComplete.value = !hideComplete.value
}

// ============
// 削除の処理
// ============
const handleDelete = (id) => {
    emit('delete-item', id)
}

// ============
// チェックの切り替え処理
// ============
const toggleItem = (id, checked) => {
    emit('toggle-item', id, checked)
}

// ============
// ソートされたアイテムを作成する
// ============
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

<style scoped>
.items-grid {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
}

.btn-link {
    background: transparent;
    border: none;
    color: #0ea85a;
    font-weight: 700;
    cursor: pointer;
    padding: 6px 8px;
}

.btn-link:hover { 
    opacity: 0.9; 
}

.toggle-btn {
    border-radius: 8px;
    transition: background .12s ease;
}

.toggle-btn:hover {
    background: rgba(14,110,64,0.06);
}

@media (max-width: 600px) {
    .items-grid {
        justify-content: center;
    }
    .btn-link {
        font-size: 14px;
        padding: 6px;
    }
}
</style>