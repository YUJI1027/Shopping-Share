<template>
  <div class="shopping-list">
    <h2>買い物リスト</h2>
    <ul>
      <li v-for="item in items" :key="item.id" class="shopping-item">
        <span @click="toggleItem(item)" :class="{ completed: item.completed }">{{ item.name }}</span>
        <button @click="editComment(item)">コメント編集</button>
        <button @click="deleteItem(item)">削除</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteItem(item) {
      this.$emit('delete-item', item);
    },
    toggleItem(item) {
      this.$emit('toggle-item', item);
    },
    editComment(item) {
      this.$emit('edit-comment', item);
    },
  },
});
</script>

<style scoped>
.shopping-list {
  background-color: #e0f7fa; /* ブルー基調の背景色 */
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.shopping-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #b2ebf2;
}

.shopping-item span {
  cursor: pointer;
}

.shopping-item span.completed {
  text-decoration: line-through;
  color: #00796b; /* 完了したアイテムの色 */
}

button {
  background-color: #00796b; /* ボタンの背景色 */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #004d40; /* ホバー時の色 */
}

/* スマホ対応 */
@media (max-width: 600px) {
  .shopping-list {
    padding: 12px;
  }

  button {
    padding: 6px;
  }
}
</style>