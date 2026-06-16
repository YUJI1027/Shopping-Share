<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-8 flex justify-center">
        <div class="w-full max-w-lg flex flex-col gap-4 animate-fade-up">
            <div  class="flex items-center gap-3">
                <button 
                    class="text-sm font-semibold text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg transition cursor-pointer bg-transparent border-none" 
                    @click="goHome"
                >
                    ⇐ 戻る
                </button>
                <h1 class="text-xl font-black text-gray-900">ユーザー設定</h1>
            </div>
            
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">ユーザー名</h2>
                <label class="flex flex-col gap-1.5">
                    <span class="text-sm text-gray-500">現在：{{ userName }}</span>
                    <input 
                        v-model="userName"
                        class="px-4 py-3 rounded-xl border borer-gray-200 bg-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                        placeholder="ユーザー名"
                    />
                </label>
                <button
                    class="self-end px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                    @click="saveUsername"
                >
                    保存
                </button>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">メールアドレス変更</h2>
                <label class="flex flex-col gap-1.5">
                    <span class="text-xs text-gray-500">新しいメールアドレス</span>
                    <input 
                        v-model="newEmail"
                        class="px-4 py-3 rounded-xl border border-gray-200  bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-2 focus:ring-green-100 transition"
                        placeholder="メールアドレス"
                    />
                </label>
                <button
                    class="self-end px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                    @click="updateUserEmail"
                >変更</button>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">パスワード</h2>
                <label class="flex flex-col gap-1.5">
                    <span class="text-xs text-gray-500">新しいパスワード</span>
                    <input 
                        v-model="newPassword"
                        type="password"
                        class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                        placeholder="新しいパスワード"
                </label>
                <button class="self-end px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                    @click="updateUserPassword"
                >変更</button>
            </div>
        </div>
    </div>
</template>

<script setup> 
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '../firebase';
import { 
    verifyBeforeUpdateEmail, 
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// ========
// state
// ========
const router = useRouter();
const userName = ref('');
const currentPassword = ref('');
const newEmail = ref('');
const newPassword = ref('');

// =========
// 初期処理
// =========
onMounted(async () => {
    const user = auth.currentUser

    if (!user) return;

    newEmail.value = user.email

    const userDoc = await getDoc(
        doc(db, 'publicUsers', user.uid)
    )

    if (userDoc.exists()) {
        userName.value = userDoc.data().name
    }
})

// ================
// Home.vueへ遷移
// ================
const goHome = () => {
    router.push('/')
}

// ==============
// ユーザー名変更
// ==============
const saveUsername = async () => {
    const user = auth.currentUser

    if (!user) return;

    await updateDoc(
        doc(db, 'publicUsers', user.uid),
        { name: userName.value }
    )

    alert('ユーザー名を変更しました')
}

// ==================
// メールアドレス変更
// ==================
const updateUserEmail = async () => {
    try {
        const user = auth.currentUser

        if (!user) return;

        await verifyBeforeUpdateEmail(user, newEmail.value)
        alert('メールアドレスを変更しました')
    } catch (error) {
        console.error('メールアドレスの変更に失敗:', error);
        alert('メールアドレスの変更に失敗しました')
    }
}

// ===============
// パスワード変更
// ===============
const updateUserPassword = async () => {
    try {
        const user = auth.currentUser

        if (!user) return;

        await updatePassword(user, newPassword.value)
        alert('パスワードを変更しました')
        newPassword.value = ''
    } catch(error) {
        console.error('パスワードの変更に失敗:', error);
        alert('パスワードの変更に失敗しました')
    }
}

// ================
// 再認証メソッド
// ================
const reauthenticate = async () => {
    const user = auth.currentUser

    if (!user) return

    const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword.value
    )

    await reauthenticateWithCredential(user, credential)
}

</script>
