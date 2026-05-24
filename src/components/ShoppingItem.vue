<template>
    <div class="item-card" :class="{ doneCard: isDone }" role="listitem" aria-label="買い物アイテム">
        <div class="item-inner">
            <div class="left">
                <input type="checkbox" class="item-check" :checked="isDone" @change="toggle" aria-label="購入済み切替" />

                <div class="meta">
                    <div class="title-row">
                        <span :class="{ done: isDone }" class="item-name">{{ name }}</span>
                        <span class="item-qty">×{{ quantity }}</span>
                    </div>
                
                    <div v-if="memo" class="item-memo">📝 {{ memo }}</div>
                    <div class="date">🕒️ {{ formatDate(createdAt) }}</div>

                    <div v-if="isDone && doneBy" class="done-by">購入者：{{  doneBy  }}が購入済</div>
                </div>
                
                <div class="actions">
                    <button @click="editItem" class="btn-sm btn-primary" aria-label="編集">✏ 編集</button>
                    <button @click="deleteItem" class="btn-sm btn-ghost delete-btn" aria-label="削除">🗑️ 削除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// =================
// App.vueからデータを受け取るためのpropsを定義
// =================
const  props = defineProps({
    id: String,
    name: String,
    isDone: Boolean,
    userName: String,
    doneBy: String,
    quantity: Number,
    memo:  String,
    createdAt: Object
})

// =================
// App.vueに削除と切り替えのイベントを送信するためのemitを定義
// =================
const emit = defineEmits([
    'delete-item',
    'toggle-item',
    'edit-memo',
    'edit-Item'])

// =================
// 削除処理
// =================
const deleteItem = () => {
    emit('delete-item', props.id)
}

// =================
// チェック切替え処理
// =================
const toggle = (event) => {
    emit('toggle-item', props.id, event.target.checked)
}

// =================
// 編集処理
// =================
const editItem = () => {
    emit("edit-item", {
        id:  props.id,
        name: props.name,
        quantity: props.quantity,
        memo: props.memo
    })
}

// =================
// 日付フォーマット関数
// =================
const  formatDate =  (timestamp) => {
    if (!timestamp) return ""
    const date = timestamp.toDate()
    return date.toLocaleString()
}
</script>

<style scoped>
.item-card {
  display: block;
  width: 100%;
  margin: 0 0 12px 0; /* 下に間隔を作る */
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 8px 22px rgba(7,37,20,0.06);
  border: 1px solid rgba(6,95,60,0.04);
  box-sizing: border-box;
  min-height: 120px;
  overflow: visible;
}

.item-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
}

.left {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex: 1 1 auto;
}

.item-check {
  width: 20px;
  height: 20px;
  margin-top: 6px;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  flex: 1 1 auto;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.item-name {
  font-weight: 700;
  color: #07182a;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
}

.item-qty {
  color: #6b7280;
  font-size: 0.95rem;
}

.item-memo {
  color: #334155;
  font-size: 0.92rem;
  background: rgba(240,248,240,0.6);
  padding: 6px 8px;
  border-radius: 8px;
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.date {
  color: #6b7280;
  font-size: 0.85rem;
}

.done {
  text-decoration: line-through;
  color: rgba(15,25,30,0.45);
}
.doneCard {
  opacity: 0.9;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 0 0 auto;
  margin-left: auto;
}

.btn-sm {
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(90deg, #0ea85a, #0b8e4d);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(11,142,77,0.12);
}

.btn-ghost {
  background: transparent;
  border: 1px solid rgba(2,6,23,0.06);
  color: #0f172a;
}

.delete-btn {
  color: #b91c1c;
  border-color: rgba(185,28,28,0.08);
}

.item-card:hover {
  transform: translateY(-2px); 
  transition: transform .12s ease;
}

.btn-sm:hover { 
  filter: brightness(0.98); 
}

@media (min-width: 1024px) {
  .item-name {
    -webkit-line-clamp: 3;
  }
  .item-memo {
    -webkit-line-clamp: 5;
  }
  .item-card {
    width: calc(50% -12px);
  }
}

@media (max-width: 600px) {
  .item-card {
    width: 100%;
    margin-right: 0;
  }
  .item-inner { 
    gap: 8px; 
  }
  .item-qty { 
    display: none; 
  }
  .btn-sm { 
    padding: 8px; 
    font-size: 0.85rem; 
  }
}
</style>