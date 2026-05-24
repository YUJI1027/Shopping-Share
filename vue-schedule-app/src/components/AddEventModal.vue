<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>新しいイベントを追加</h2>
      <form @submit.prevent="addEvent">
        <div class="form-group">
          <label for="eventName">イベント名</label>
          <input type="text" id="eventName" v-model="eventName" required />
        </div>
        <div class="form-group">
          <label for="eventDate">日付</label>
          <input type="date" id="eventDate" v-model="eventDate" required />
        </div>
        <div class="form-group">
          <label for="eventTime">時間</label>
          <input type="time" id="eventTime" v-model="eventTime" required />
        </div>
        <div class="form-group">
          <label for="eventDescription">説明</label>
          <textarea id="eventDescription" v-model="eventDescription"></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" @click="close">キャンセル</button>
          <button type="submit">追加</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const eventName = ref('');
    const eventDate = ref('');
    const eventTime = ref('');
    const eventDescription = ref('');

    const addEvent = () => {
      const newEvent = {
        name: eventName.value,
        date: eventDate.value,
        time: eventTime.value,
        description: eventDescription.value
      };
      emit('event-added', newEvent);
      clearForm();
    };

    const clearForm = () => {
      eventName.value = '';
      eventDate.value = '';
      eventTime.value = '';
      eventDescription.value = '';
    };

    const close = () => {
      emit('close');
      clearForm();
    };

    return {
      eventName,
      eventDate,
      eventTime,
      eventDescription,
      addEvent,
      close
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}
</style>