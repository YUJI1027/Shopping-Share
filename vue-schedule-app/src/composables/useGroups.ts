import { ref } from 'vue';
import { Group } from '../types';

export function useGroups() {
    const userGroups = ref<Group[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchUserGroups = async (userId: string) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch(`/api/groups?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            userGroups.value = await response.json();
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    const addGroup = async (newGroup: Group) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGroup),
            });
            if (!response.ok) {
                throw new Error('Failed to add group');
            }
            const addedGroup = await response.json();
            userGroups.value.push(addedGroup);
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        userGroups,
        isLoading,
        error,
        fetchUserGroups,
        addGroup,
    };
}