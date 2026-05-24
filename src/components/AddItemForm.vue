<template>
    <div class="modal-overlay" @click.self="$emit('close')" role="dialog" aria-modal="true">
        <div class="modal-card" @keydown.enter="AddItem" tabindex="1">
            <h3 class="modal-title">
                {{ editingItem ? "お買い物を編集する" : "お買い物を登録する" }}
            </h3>

            <input 
                class="input"
                v-model="item"
                placeholder="商品名"
                inputmode="text"
            />

            <input 
                v-model.number="quantity"
                type="number"
                min="1"
                placeholder="数量"
                class="input"
            />

            <textarea 
                v-model="memo"
                placeholder="メモ"
                class="input textarea"
            ></textarea>

            <div class="btn-group">
                <button @click="AddItem" class="btn-primary">
                    {{ editingItem ? "更新" : "登録" }}    
                </button>

                <button @click="$emit('close')" class="btn-ghost">
                    キャンセル    
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

// ================
// state
// ==============
const item = ref('')
const quantity  = ref(1)
const memo = ref('')

const props = defineProps({
    editingItem:  Object
})

// ================
// アイテム追加
// ==============
const emit = defineEmits(['add-item'])
const AddItem = () => {
    if (!item.value.trim()) return

    // Home.vueにデータを送信する
    emit('add-item', item.value, quantity.value, memo.value)
    item.value = ''
    quantity.value = 1
    memo.value = ''
}

// ===============
// 編集アイテムの反映
// =============
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

<style scoped>
.modal-overlay{
    position: fixed;
    inset: 0;
    background: rgba(243,244,246,0.9); /* 薄いグレー */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 9999;
    -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
}

.modal-card{
    width: 100%;
    max-width: 520px;
    background: #fff;
    border-radius: 14px;
    padding: 18px;
    box-shadow: 0 12px 30px rgba(7,37,20,0.06);
    border: 1px solid rgba(6,95,60,0.04);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transform: none;
}

.modal-title{
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #07182a;
}

.input{
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(7,20,30,0.06);
    background: #fff;
    font-size: 16px;
    line-height: 1.2;
    box-sizing: border-box;
    transition: box-shadow .12s ease, border-color .12s ease;
    -webkit-text-size-adjust: 100%;
}
.textarea{ 
    min-height: 96px; 
    resize: vertical; 
}

.input:focus, textarea:focus {
    outline: none;
    border-color: rgba(14,110,64,0.16);
    box-shadow: 0 8px 24px rgba(14,110,64,0.06);
    transform: none;
}

.btn-group{
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 6px;
}

.btn-primary{
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(90deg, #0ea85a, #0b8e4d);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(11,142,77,0.12);
}

.btn-ghost{
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid rgba(2,6,23,0.06);
    background: transparent;
    cursor: pointer;
}

@media (max-width: 420px){
    .modal-card{ 
        padding: 14px; 
        border-radius: 12px; 
    }
    
    .btn-group{ 
        flex-direction: column-reverse; 
        gap: 8px; 
    }

    .btn-primary, .btn-ghost{ 
        width: 100%; 
    }
}
</style>