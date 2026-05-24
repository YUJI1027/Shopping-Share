<template>
  <div id="app">
    <Header />
    
    <div class="content">
      <AddItemForm 
        v-if="showForm"
        :editingItem="editingItem"
        @add-item="AddItem"
        @close="closeForm"
      />
      <p class="remaining">
        残り{{ remainingCount }}件
      </p>
      <ShoppingList 
        :items="items"
        @delete-item="deleteItem"
        @toggle-item="toggleItem"
        @edit-comment="editComment"
        @edit-item="startEdit"
      />
    </div>
    
    <button @click="showForm = true" class="add-button">
      🛒 買い物を登録する
    </button>

    <ToastMessage 
      :message="toastMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import AddItemForm from './components/AddItemForm.vue';
import ShoppingList from './components/ShoppingList.vue';
import ToastMessage from './components/ToastMessage.vue';

export default defineComponent({
  components: {
    Header,
    AddItemForm,
    ShoppingList,
    ToastMessage
  },
  data() {
    return {
      showForm: false,
      editingItem: null,
      items: [],
      toastMessage: '',
    };
  },
  computed: {
    remainingCount() {
      return this.items.filter(item => !item.completed).length;
    }
  },
  methods: {
    AddItem(item) {
      this.items.push(item);
      this.showForm = false;
      this.toastMessage = 'アイテムが追加されました！';
    },
    closeForm() {
      this.showForm = false;
    },
    deleteItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
      this.toastMessage = 'アイテムが削除されました！';
    },
    toggleItem(itemId) {
      const item = this.items.find(item => item.id === itemId);
      if (item) {
        item.completed = !item.completed;
      }
    },
    editComment(itemId, newComment) {
      const item = this.items.find(item => item.id === itemId);
      if (item) {
        item.comment = newComment;
      }
    },
    startEdit(item) {
      this.editingItem = item;
      this.showForm = true;
    }
  }
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.content {
  background-color: #f0f8ff; /* Light blue background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-button {
  background-color: #007bff; /* Blue button */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

/* スマホ対応 */
@media (max-width: 600px) {
  .content {
    padding: 10px;
  }

  .add-button {
    width: 100%;
    font-size: 18px;
  }
}
</style>