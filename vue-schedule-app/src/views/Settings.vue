<template>
  <div class="settings">
    <h1>設定</h1>
    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="username">ユーザー名</label>
        <input type="text" id="username" v-model="settings.username" />
      </div>
      <div class="form-group">
        <label for="email">メールアドレス</label>
        <input type="email" id="email" v-model="settings.email" />
      </div>
      <div class="form-group">
        <label for="notification">通知設定</label>
        <select id="notification" v-model="settings.notification">
          <option value="all">すべて</option>
          <option value="important">重要なもののみ</option>
          <option value="none">通知しない</option>
        </select>
      </div>
      <button type="submit">保存</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Settings',
  setup() {
    const settings = ref({
      username: '',
      email: '',
      notification: 'all',
    });

    const saveSettings = () => {
      // 設定を保存するロジックをここに追加
      console.log('設定が保存されました:', settings.value);
    };

    return {
      settings,
      saveSettings,
    };
  },
});
</script>

<style scoped>
.settings {
  padding: 20px;
  background-color: #f0f4ff; /* ブルー基調の背景 */
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff; /* ブルーのボタン */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* ホバー時の色 */
}
</style>