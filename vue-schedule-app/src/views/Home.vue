<template>
    <DefaultLayout>
        <div class="home-container">
            <Header />
            <LoadingOverlay v-if="isLoading" />
            <div class="user-info">
                <div class="header-right">
                    <span class="user-name">{{ userName }}</span>
                    <button class="logout-button" @click="logout">ログアウト</button>
                </div>
            </div>
            <div class="group-section">
                <h3>参加しているグループ一覧</h3>
                <p>現在参加しているグループ名：{{ groupName }}</p>
                <p>グループ数：{{ userGroups.length }}</p>
                <GroupList :groups="userGroups" @switchGroup="switchGroup" :activeGroupId="groupId" />
            </div>
        </div>
    </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '@/components/Header.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import GroupList from '@/components/GroupList.vue';
import { useAuth } from '@/composables/useAuth';
import { useGroups } from '@/composables/useGroups';

export default defineComponent({
    components: {
        Header,
        LoadingOverlay,
        GroupList,
    },
    setup() {
        const { user, userName, logout } = useAuth();
        const { userGroups, groupName, switchGroup, groupId, isLoading } = useGroups();

        return {
            user,
            userName,
            logout,
            userGroups,
            groupName,
            switchGroup,
            groupId,
            isLoading,
        };
    },
});
</script>

<style scoped>
.home-container {
    padding: 20px;
    background-color: var(--background-color);
}

.user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.logout-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.group-section {
    margin-top: 20px;
}

h3 {
    color: var(--primary-color);
}
</style>