<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-8 flex justify-center">
        <div class="w-full max-w-lg flex flex-col gap-4 animate-fade-up">
            <div  class="flex items-center gap-3">
                <button 
                    class="text-sm font-semibold text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg transition cursor-pointer bg-transparent border-none" 
                    @click="goBack"
                >
                    ⇐ 戻る
                </button>
                <h1 class="text-xl font-black text-gray-900">ユーザー設定</h1>
            </div>
            
            <!-- ユーザー名 -->
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">ユーザー名</h2>
                <label class="flex flex-col gap-1.5">
                    <span class="text-sm text-gray-500">現在：{{ userName }}</span>
                    <input 
                        v-model="userName"
                        class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
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

            <!-- メールアドレス変更 -->
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">メールアドレス変更</h2>
                <p class="text-xs text-gray-400">変更時に現在のパスワードによる確認が必要です。</p>
                <label class="flex flex-col gap-1.5">
                    <span class="text-xs text-gray-500">新しいメールアドレス</span>
                    <input 
                        v-model="newEmail"
                        type="email"
                        class="px-4 py-3 rounded-xl border border-gray-200  bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-2 focus:ring-green-100 transition"
                        placeholder="メールアドレス"
                    />
                </label>
                <button
                    class="self-end px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                    @click="requestReauth('email')"
                >
                    変更
                </button>
            </div>

            <!-- パスワード変更 -->
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">パスワード</h2>
                <p class="text-xs text-gray-400">変更時に現在のパスワードによる確認が必要です。</p>
                <label class="flex flex-col gap-1.5">
                    <span class="text-xs text-gray-500">新しいパスワード</span>
                    <input 
                        v-model="newPassword"
                        type="password"
                        class="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                        placeholder="新しいパスワード（６文字以上）"
                    />
                </label>
                <button 
                    class="self-end px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                    @click="requestReauth('password')"
                >
                    変更
                </button>
            </div>

            <!-- 再認証モーダル -->
            <div 
                v-if="showReauthModal"
                class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            >
                <div  class="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
                    <h3 class="text-base font-bold text-gray-900">本人確認</h3>
                    <p class="text-sm text-gray-500">継続するには現在のパスワードを入力してください。</p>

                    <label class="flex flex-col gap-1.5">
                        <span class="text-xs text-gray-500">現在のパスワード</span>
                        <input
                            v-model="currentPassword"
                            type="password"
                            placeholder="現在のパスワード"
                            class="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                        />
                    </label>

                    <p v-if="reauthError" class="text-xs text-red-500">{{ reauthError }}</p>

                    <div class="flex gap-2">
                        <button 
                            @click="closeReauthModal"
                            class="flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 transition  cursor-pointer bg-white"
                        >
                            キャンセル
                        </button>
                        <button 
                            @click="confirmReauth"
                            :disabled="isProcessing"
                            class="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 transition cursor-pointer disabled:opacity-50"
                        >
                            {{ isProcessing ? '確認...' : '確認' }}
                        </button>
                    </div>
                </div>
            </div>
            <!-- メール通知設定 準備中のためコメントアウト -->
            <!-- <div class="bg-white rounded-2xl p-5 shadow-sm border border-green-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">メール通知</h2>
                <p class="text-xs text-gray-500">グループに新しいメンバーが参加したときにメールで通知を受け取ります。</p>

                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700">参加通知メールを受け取る</span> -->
                    <!-- トグルスイッチ -->
                    <!-- <button 
                        @click="toggleEmailNotify"
                        class="relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer border-none"
                        :class="emailNotify ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-200'"
                    >
                        <span 
                            class="inline-block w-5 h-5 bg-white rounded-full transform transition-transform duration-200"
                            :class="emailNotify ? 'translate-x-6' : 'translate-x-1'"
                        />
                    </button>
                </div>

                <p class="text-xs" :class="emailNotify ? 'text-green-600' : 'text-gray-400'">
                    {{ emailNotify ? '✅️ 通知ON：メールを受け取ります' : '🔕 通知OFF：メールを受け取りません' }}
                </p>
            </div> -->
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
// const emailNotify = ref(false) //メール通知

// 再認証モーダル
const showReauthModal = ref(false)
const reauthTarget = ref('')  // 'email or password'
const reauthError = ref('')
const isProcessing = ref(false)

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
        // 準備中のためコメントアウト
        // emailNotify.value = userDoc.data().emailNotify ?? false
    }
})

// ================
// Home.vueへ遷移
// ================
const goBack = () => {
    router.back()
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
// 再認証モーダルを開く
// ==================
const requestReauth = (target) => {
    reauthTarget.value = target
    reauthError.value = ''
    currentPassword.value = ''
    showReauthModal.value = true
}

// =====================
// 再認証モーダルを閉じる
// =====================
const closeReauthModal = () => {
    showReauthModal.value = false
    reauthError.value = ''
    currentPassword.value = ''
}

// ======================
// 再認証して変更処理を実行
// ======================
const confirmReauth = async () => {
    const user = auth.currentUser
    if (!user) return

    isProcessing.value = true
    reauthError.value = ''

    try {
        // 再認証
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword.value
        )
        await reauthenticateWithCredential(user, credential)

        // 再認証成功⇛変更処理を実行
        if (reauthTarget.value === 'email') {
            await updateUserEmail(user)
        } else if (reauthTarget.value === 'password') {
            await updateUserPassword(user)
        }

        closeReauthModal()
    } catch (error) {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            reauthError.value = 'パスワードが正しくありません。'
        } else {
            reauthError.value = 'エラーが発生しました。もう一度お試しください。'
        }
    } finally {
        isProcessing.value = false
    }
}

// ==================
// メールアドレス変更
// ==================
const updateUserEmail = async (user) => {
    try  {
        await verifyBeforeUpdateEmail(user, newEmail.value)
        alert('確認メールを送信しました。メール内のリンクをクリックして変更を完了してください。')
    } catch (error) {
        console.error('メールアドレスの変更に失敗：', error)
        alert('メールアドレスの変更に失敗しました。')
    }
}

// ==================
// パスワード変更
// ==================
const updateUserPassword = async (user) => {
    try {
        await updatePassword(user, newPassword.value)
        alert('パスワードを変更しました。')
        newPassword.value = ''
    } catch (error) {
        console.error('パスワードの変更に失敗：', error)
        alert('パスワードの変更に失敗しました。')
    }
}

// =======================================
// メール通知トグル 準備中のためコメントアウト
// =======================================
// const toggleEmailNotify = async () => {
//     const user = auth.currentUser

//     if (!user) return
    
//     emailNotify.value = !emailNotify.value

//     await  updateDoc(
//         doc(db, 'publicUsers', user.uid),
//         { emailNotify: emailNotify.value }
//     )
// }
</script>
