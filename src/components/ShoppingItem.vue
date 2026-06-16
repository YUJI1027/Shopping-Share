<template>
    <div 
      class="w-full bg-white rounded-2xl p-4 border transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md" 
      :class="isDone
        ? 'border-gray-100 opacity-70'
        : 'border-gray-100 shadow-sm shadow-green-50'" 
      role="listitem" 
      aria-label="買い物アイテム"
    >
        <div class="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  class="mt-1 w-5 h-5 rounded-md accent-green-500 cursor-pointer shrink-0" 
                  :checked="isDone" 
                  @change="toggle" 
                  aria-label="購入済み切替"
                />

                <div class="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span 
                          :class="{ 'line-through  text-gray-400': isDone }" 
                          class="font-bold text-gray-900 break-words"
                        >
                          {{ name }}
                        </span>
                        <span class="text-xs text-gray-400 font-medium">×{{ quantity }}</span>
                    </div>
                
                    <div 
                      v-if="memo" 
                      class="text-xs text-gray-600 bg-green-50 px-2.5 py-1.5 rounded-lg leading-relaxed line-clamp-3"
                    >
                      📝 {{ memo }}
                    </div>
                    <div class="text-xs text-gray-400">🕒️ {{ formatDate(createdAt) }}</div>

                    <div 
                      v-if="isDone && doneBy" 
                      class="text-xs text-emerald-600 font-medium"
                    >
                      ✅️ {{  doneBy  }}が購入済み
                    </div>
                </div>
                
                <div class="flex flex-col gap-1.5 shrink-0">
                    <button 
                      @click="editItem" 
                      class="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-sm hover:opacity-90 transition cursor-pointer" 
                      aria-label="編集"
                    >
                      ✏ 編集
                    </button>
                    <button 
                      @click="deleteItem" 
                      class="px-3 py-1.5 text-xs font-medium text-red-500 border border-re-100 bg-red-50/60 rounded-lg hover:bg-red-100 transition cursor-pointer" 
                      aria-label="削除"
                    >
                      🗑️ 削除
                    </button>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// =========================================
// Home.vueからデータを受け取るためのpropsを定義
// =========================================
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

// ======================================================
// Home.vueに削除と切り替えのイベントを送信するためのemitを定義
// ======================================================
const emit = defineEmits([
    'delete-item',
    'toggle-item',
    'edit-memo',
    'edit-Item'])

// =========
// 削除処理
// =========
const deleteItem = () => {
    emit('delete-item', props.id)
}

// =================
// チェック切替え処理
// =================
const toggle = (event) => {
    emit('toggle-item', props.id, event.target.checked)
}

// =========
// 編集処理
// =========
const editItem = () => {
    emit("edit-item", {
        id:  props.id,
        name: props.name,
        quantity: props.quantity,
        memo: props.memo
    })
}

// ====================
// 日付フォーマット関数
// ====================
const  formatDate =  (timestamp) => {
    if (!timestamp) return ""
    const date = timestamp.toDate()
    return date.toLocaleString()
}
</script>
