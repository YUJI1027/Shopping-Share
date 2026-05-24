<template>
  <div class="home">
    <h1 class="title">買い物リスト</h1>
    <p class="description">あなたの買い物を管理しましょう。</p>
    <AddItemForm 
      v-if="showForm"
      @add-item="addItem"
      @close="showForm = false"
    />
    <button @click="showForm = true" class="add-button">
      🛒 買い物を登録する
    </button>
    <ShoppingList 
      :items="items"
      @delete-item="deleteItem"
      @toggle-item="toggleItem"
      @edit-item="startEdit"
    />
    <ToastMessage :message="toastMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AddItemForm from '../components/AddItemForm.vue';
import ShoppingList from '../components/ShoppingList.vue';
import ToastMessage from '../components/ToastMessage.vue';

export default defineComponent({
  components: {
    AddItemForm,
    ShoppingList,
    ToastMessage,
  },
  setup() {
    const showForm = ref(false);
    const items = ref([]);
    const toastMessage = ref('');

    const addItem = (item) => {
      items.value.push(item);
      toastMessage.value = 'アイテムが追加されました！';
    };

    const deleteItem = (itemId) => {
      items.value = items.value.filter(item => item.id !== itemId);
      toastMessage.value = 'アイテムが削除されました！';
    };

    const toggleItem = (itemId) => {
      const item = items.value.find(item => item.id === itemId);
      if (item) {
        item.completed = !item.completed;
      }
    };

    const startEdit = (item) => {
      // 編集機能の実装
    };

    return {
      showForm,
      items,
      toastMessage,
      addItem,
      deleteItem,
      toggleItem,
      startEdit,
    };
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #e0f7fa; /* 明るい青の背景 */
}

.title {
  color: #00796b; /* ダークブルー */
  font-size: 2em;
  text-align: center;
}

.description {
  color: #004d40; /* 深い青 */
  text-align: center;
}

.add-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #00796b; /* ボタンの色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #004d40; /* ホバー時の色 */
}
</style>