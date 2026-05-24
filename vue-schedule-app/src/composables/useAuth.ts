import { ref } from 'vue';

export function useAuth() {
    const user = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const login = async (credentials) => {
        isLoading.value = true;
        error.value = null;

        try {
            // ここでAPIを呼び出してユーザーを認証します
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('ログインに失敗しました');
            }

            user.value = await response.json();
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            await fetch('/api/logout', {
                method: 'POST',
            });
            user.value = null;
        } catch (err) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        user,
        isLoading,
        error,
        login,
        logout,
    };
}