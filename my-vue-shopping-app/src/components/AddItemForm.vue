<template>
  <div class="add-item-form">
    <h2>買い物アイテムを追加</h2>
    <form @submit.prevent="submitForm">
      <input 
        type="text" 
        v-model="itemName" 
        placeholder="アイテム名" 
        required 
      />
      <button type="submit">追加</button>
      <button type="button" @click="$emit('close')">閉じる</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    editingItem: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit }) {
    const itemName = ref('');

    const submitForm = () => {
      if (itemName.value) {
        emit('add-item', { name: itemName.value });
        itemName.value = '';
      }
    };

    return {
      itemName,
      submitForm
    };
  }
});
</script>

<style scoped>
.add-item-form {
  background-color: #e0f7fa; /* 明るい青色 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-item-form h2 {
  color: #00796b; /* ダークブルー */
}

.add-item-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #00796b;
  border-radius: 4px;
}

.add-item-form button {
  background-color: #00796b; /* ボタンの色 */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-item-form button:hover {
  background-color: #004d40; /* ホバー時の色 */
}

/* スマホ対応 */
@media (max-width: 600px) {
  .add-item-form {
    padding: 15px;
  }

  .add-item-form input,
  .add-item-form button {
    font-size: 14px;
  }
}
</style>