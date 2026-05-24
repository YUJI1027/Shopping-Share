<template>
  <div class="group-list">
    <h3>参加しているグループ</h3>
    <ul>
      <li
        v-for="group in groups"
        :key="group.id"
        @click="selectGroup(group.id)"
        class="group-item"
      >
        <GroupCard :group="group" />
      </li>
    </ul>
    <div v-if="groups.length === 0" class="no-groups">
      <p>グループがありません。新しいグループを作成してください。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupCard from './GroupCard.vue';
import { useGroups } from '../composables/useGroups';

export default defineComponent({
  name: 'GroupList',
  components: {
    GroupCard,
  },
  setup() {
    const { groups, selectGroup } = useGroups();

    return {
      groups,
      selectGroup,
    };
  },
});
</script>

<style scoped>
.group-list {
  padding: 16px;
  background-color: #f0f4ff; /* 明るいブルーの背景 */
  border-radius: 8px;
}

.group-item {
  cursor: pointer;
  margin-bottom: 12px;
  transition: background-color 0.3s;
}

.group-item:hover {
  background-color: #e0e7ff; /* ホバー時の色 */
}

.no-groups {
  text-align: center;
  color: #666;
}
</style>