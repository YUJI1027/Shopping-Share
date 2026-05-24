<template>
    <div class="page-container">
        <div class="page-inner">
            <div  class="card" role="region" aria-label="ユーザー設定">
                <div class="card-head" style="display:flex; align-items: center; gap: 12px; justify-content: flex-start;">
                    <button class="back-button" @click="goHome">⇐ 戻る</button>
                    <h1 class="card-title">ユーザー設定</h1>
                </div>
            
                <section class="section">
                    <h2 class="section-title">ユーザー名</h2>
                    <div class="form">
                        <label class="form-label">
                            <span class="label-text">ユーザー名: {{ userName }}</span>
                            <input 
                                v-model="userName"
                                class="input"
                                placeholder="ユーザー名"
                            />
                        </label>
                        <button
                            class="btn-primary"
                            @click="saveUsername"
                        >保存</button>
                    </div>
                </section>

                <section class="section">
                    <h2 class="section-title">メールアドレス変更</h2>
                    <div class="form">
                        <label class="form-label">
                            <span class="label-text">新しいメールアドレス</span>
                            <input 
                                v-model="newEmail"
                                class="input"
                                placeholder="メールアドレス"
                            />
                        </label>
                        <button
                            class="btn-primary"
                            @click="updateUserEmail"
                        >メールアドレス変更</button>
                    </div>
                </section>

                <section class="section">
                    <h2 class="section-title">パスワード</h2>
                    <div class="form">
                        <label class="form-label">
                            <span class="label-text">新しいパスワード</span>
                            <input 
                                v-model="newPassword"
                                type="password"
                                class="input"
                                placeholder="新しいパスワード"
                        </label>
                        <button class="btn-primary"
                            @click="updateUserPassword"
                        >パスワード変更</button>
                    </div>
                </section>
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

// =============
// state
// ============
const router = useRouter();
const userName = ref('');
const currentPassword = ref('');
const newEmail = ref('');
const newPassword = ref('');

// =============
// 初期処理
// ===========
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

// =============
// Home.vueへ遷移
// ============
const goHome = () => {
    router.push('/')
}

// =============
// ユーザー名変更
// ===========
const saveUsername = async () => {
    const user = auth.currentUser

    if (!user) return;

    await updateDoc(
        doc(db, 'publicUsers', user.uid),
        { name: userName.value }
    )

    alert('ユーザー名を変更しました')
}

// =============
// メールアドレス変更
// ===========
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

// =============
// パスワード変更
// ===========
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

// =============
// 再認証メソッド
// =============
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

<style scoped>
.page-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #f1fbf4, #ffffff);
    padding: 32px 16px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Noto Sans JP", "Segoe UI", Roboto, sans-serif;
    color: #0f172a;
}

.section {
    margin-top: 20px;
}

.section-title {
    margin: 0 auto 12px;
    font-size: 16px;
    color: #0f172a;
    font-weight: 700;
}

.page-inner {
    width: 100%;
    margin: 0 auto;
    padding: 0 auto;
    justify-content: center;
}

.card {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    padding: 20px;
    box-shadow:  0 8px 30px rgba(7, 37, 20, 0.06);
    border: 1px solid rgba(6, 95, 60, 0.04);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
}

.card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #07182a;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.form-label { 
    display: flex; 
    flex-direction: 
    column; gap: 6px;
}

.label-text { 
    font-size: 13px; 
    color: #6b7280;
}

.input, input[type="text"], input[type="email"], input[type="password"], textarea {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(7, 20, 30, 0.06);
    background: #fff;
    font-size: 15px;
    outline: none;
    transition: box-shadow .12s ease, border-color .12s ease;
    box-sizing: border-box;
}

.input:focus, input:focus, textarea:focus {
    border-color: rgba(14,110,64,0.16);
    box-shadow: 0 6px 18px rgba(14,110,64,0.06);
}

.btn-primary {
    margin-top: 6px;
    padding: 12px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(90deg, #0ea85a, #0b8e4d);
    color: white;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(11,142,77,0.12);
}
.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-link {
    background: transparent;
    border: none;
    color: #0ea85a;
    font-weight: 600;
    cursor: pointer;
    padding: 6px;
}

.back-button {
    background: transparent;
    border: none;
    color: #0ea85a;
    font-weight: 600;
    cursor: pointer;
    padding: 6px;
}

.muted {
    color: #6b7280;
    font-size: 13px;
}

/* レスポンシブ微調整 */
@media (max-width: 880px) {
    .card {
        padding: 18px;
    }
}
@media (max-width: 420px) {
    .card {
        padding: 14px;
        border-radius: 12px;
    }
    .input {
        padding: 10px;
    }
    .btn-primary {
        padding: 10px;
    }
}
</style>