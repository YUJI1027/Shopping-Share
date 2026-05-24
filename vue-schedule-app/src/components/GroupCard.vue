<template>
  <div class="group-card" @click="selectGroup">
    <div class="group-card-header">
      <h4>{{ group.name }}</h4>
      <span class="group-member-count">{{ group.memberCount }} members</span>
    </div>
    <div class="group-card-body">
      <p>{{ group.description }}</p>
    </div>
    <div class="group-card-footer">
      <button class="btn-join" @click.stop="joinGroup">参加する</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupCard',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectGroup() {
      this.$emit('select', this.group.id);
    },
    joinGroup() {
      this.$emit('join', this.group.id);
    },
  },
});
</script>

<style scoped>
.group-card {
  background-color: #f0f8ff; /* Light blue background */
  border: 1px solid #007bff; /* Blue border */
  border-radius: 8px;
  padding: 16px;
  margin: 10px 0;
  transition: transform 0.2s;
  cursor: pointer;
}

.group-card:hover {
  transform: scale(1.02);
}

.group-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.group-member-count {
  font-size: 0.9em;
  color: #007bff; /* Blue text */
}

.btn-join {
  background-color: #007bff; /* Blue button */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-join:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>