// ...existing code...
<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-10">
        <div class="w-full max-w-sm flex flex-col items-center gap-6 animate-fade-up">
            <div class="flex flex-col items-center gap-2 text-center">
                    <span class="text-5xl leading-none" aria-hidden="true">🛒</span>
                    <h1 class="text-2xl font-black tracking-tight text-green-800">Shopping Share</h1>
                    <p class="text-sm text-gray-500 leading-relaxed">グループで共有する買い物メモ。<br>すぐ始められます。</p>

                <div class="w-80 bg-white rounded-2xl p-6 shadow-lg shadow-green-100 border border-gray-100 flex flex-col gap-4" role="region" aria-label="ログイン">
                    <h2 class="text-lg font-bold text-gray-900">ログイン</h2>
            
                    <form @submit.prevent="login" class="flex  flex-col gap-3">
                        <label class="flex flex-col gap-1.5">
                            <span class="text-xs font-medium text-gray-500">メールアドレス</span>
                            <input v-model="email" type="email" required autocomplete="email" class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
                        </label>

                        <label class="flex flex-col gap-1.5">
                            <span class="text-xs font-medium text-gray-500">パスワード</span>
                            <input v-model="password" type="password" required autocomplete="current-password" class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
                        </label>

                        <button type="submit" :disabled="isSubmitting" class="mt-1 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200  transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                            {{ isSubmitting ? 'ログイン中…' : 'ログイン' }}
                        </button>
                    </form>

                    <div class="flex justify-center pt-1">
                        <button class="text-sm font-semibold text-green-600 hover:underline cursor-pointer bg-transparent border-none" @click="goRegister" aria-label="新規登録へ">新規登録はこちら</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// ======================
// コンポーネントのインポート
// ======================
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

// ========================
// state
// ========================
const email = ref('')
const password = ref('')
const router = useRouter()
const isSubmitting = ref(false)

// ========================
// login処理
// ========================
const login = async () => {
    isSubmitting.value = true
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push('/') // ログイン成功後にホームページへリダイレクト
    } catch (error) {
        alert('ログインに失敗しました: ' + (error.message || error))
    } finally {
        isSubmitting.value = false
    }
}

// ======================
// 新規登録ページへ遷移
// ======================
const goRegister = () => {
  router.push('/register') // 新規登録ページへリダイレクト
}
</script>