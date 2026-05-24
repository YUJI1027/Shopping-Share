<template>
  <div class="event-card">
    <div class="event-header">
      <h3 class="event-title">{{ event.title }}</h3>
      <p class="event-date">{{ formatDate(event.date) }}</p>
    </div>
    <div class="event-details">
      <p class="event-description">{{ event.description }}</p>
      <div class="event-actions">
        <button @click="editEvent" class="btn-edit">編集</button>
        <button @click="deleteEvent" class="btn-delete">削除</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatDate } from '@/utils/formatDate';

export default defineComponent({
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date: string) {
      return formatDate(date);
    },
    editEvent() {
      this.$emit('edit', this.event.id);
    },
    deleteEvent() {
      this.$emit('delete', this.event.id);
    },
  },
});
</script>

<style scoped>
.event-card {
  background-color: #f0f8ff; /* Light blue background */
  border: 1px solid #007bff; /* Blue border */
  border-radius: 8px;
  padding: 16px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-title {
  font-size: 1.5em;
  color: #007bff; /* Blue text */
}

.event-date {
  font-size: 0.9em;
  color: #555;
}

.event-details {
  margin-top: 10px;
}

.event-description {
  font-size: 1em;
  color: #333;
}

.event-actions {
  margin-top: 10px;
}

.btn-edit,
.btn-delete {
  background-color: #007bff; /* Blue button */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-edit:hover,
.btn-delete:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>