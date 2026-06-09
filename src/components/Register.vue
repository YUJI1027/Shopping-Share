<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-10">
        <div class="w-fll max-w-sm flex flex-col gap-6 animate-fade-up">    
            <div class="flex flex-col items-center gap-2 text-center">
                <span class="text-5xl leading-none">🛒</span>
                <h1 class="text-2xl font-black tracking-tight text-green-800">Shopping Share</h1>
                <p class="text-sm text-gray-500 leading-relaxed">グループで共有する買い物メモ。<br>すぐ始められます。</p>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-lg shadow-green-100 border border-gray-100 flex flex-col gap-4" role="region" aria-label="新規登録">
                <h2 class="text-lg font-bold text-gray-900 text-center">新規登録</h2>
                
                <form @submit.prevent="register" class="flex flex-col gap-3">
                    <label class="flex flex-col gap-1.5">
                        <span class="text-xs font-medium text-gray-500">ユーザー名</span>
                        <input v-model="name" type="text" required class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
                    </label>

                    <label class="flex flex-col gap-1.5">
                        <span class="text-xs font-medium text-gray-500">メールアドレス</span>
                        <input v-model="email" type="email" required autocomplete="email" class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
                    </label>

                    <label class="flex flex-col gap-1.5">
                        <span class="text-xs font-medium text-gray-500">パスワード</span>
                        <input v-model="password" type="password" minlength="6" required autocomplete="new-password" class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition" />
                    </label>

                    <button type="submit" :disabled="isSubmitting" class="mt-1 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-green-200 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                        {{ isSubmitting ? '登録中…' : '登録' }}
                    </button>
                </form>

                <div class="flex justify-center pt-1">
                    <button class="text-sm font-semibold text-green-600 hover:underline cursor-pointer bg-transparent border-none" @click="goLogin" aria-label="ログインへ">すでにアカウントをお持ちの方はこちら</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// コンポーネントのインポート
import { ref } from 'vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useRouter } from 'vue-router'
import { setDoc, doc } from 'firebase/firestore'

// =========
// state
// =========
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const isSubmitting = ref(false)

// ============
// 新規登録処理
// ============
const register = async ()  => {
    isSubmitting.value = true
    try {
        const userCred = await createUserWithEmailAndPassword(
            auth, 
            email.value, 
            password.value
        )
        
        await updateProfile(userCred.user, { displayName: name.value })

        await setDoc(doc(db, "users", userCred.user.uid), {
            name: name.value,
            groups: []
        })

        await setDoc(doc(db, "publicUsers", userCred.user.uid), {
            name: name.value
        })

        router.push('/')
    } catch (error) {
        let errorMessage = "登録に失敗しました。"

        if (error.code === 'auth/email-already-in-use') {
            errorMessage += "このメールアドレスは既に使用されています。"
        } else if (error.code === 'auth/invalid-email') {
            errorMessage += "無効なメールアドレスです。"
        } else if (error.code === 'auth/weak-password') {
            errorMessage += "パスワードは6文字以上である必要があります。"
        } else {
            errorMessage += error.message || error
        }
        alert(errorMessage)
    } finally {
        isSubmitting.value = false
    }
}

// ====================
// ログインページへ遷移
// ====================
const goLogin = () => {
    router.push('/login')
}

</script>