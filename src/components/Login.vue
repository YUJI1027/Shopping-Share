// ...existing code...
<template>
    <div class="page">
        <div class="page-inner">
            <div class="hero">
                <div class="hero-left">
                    <div class="brand">
                        <span class="logo" aria-hidden="true">🛒</span>
                        <h1 class="app-name">Shopping Share</h1>
                    </div>
                    <p class="lead">グループで共有する買い物メモ。<br>すぐ始められます。</p>
                </div>

                <div class="card" role="region" aria-label="ログイン">
                    <h2 class="card-title">ログイン</h2>
            
                    <form @submit.prevent="login" class="form">
                        <label class="form-label">
                            <span class="label-text">メールアドレス</span>
                            <input v-model="email" type="email" required autocomplete="email" class="input" />
                        </label>

                        <label class="form-label">
                            <span class="label-text">パスワード</span>
                            <input v-model="password" type="password" required autocomplete="current-password" class="input" />
                        </label>

                        <button type="submit" class="btn-primary" :disabled="isSubmitting">
                            {{ isSubmitting ? 'ログイン中…' : 'ログイン' }}
                        </button>
                    </form>

                    <div class="card-foot">
                        <button class="btn-link" @click="goRegister" aria-label="新規登録へ">新規登録はこちら</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// コンポーネントのインポート
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

<style scoped>
.page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #f1fbf4, #ffffff);
    padding: 32px 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Noto Sans JP", "Segoe UI", Roboto, sans-serif;
    color: #0f172a;
}

.page-inner {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 12px;
}

/* ヒーローレイアウト */
.hero {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: center;
    justify-content: center;
}

/* 左の説明 */
.hero-left {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 18px;
    text-align: center;
}
.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
}
.logo {
    font-size: 36px;
    line-height: 1;
}
.app-name {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #0ea85a;
}
.lead {
    margin-top: 12px;
    color: #6b7280;
    line-height: 1.5;
}

/* カード */
.card {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border-radius: 14px;
    padding: 22px;
    box-shadow: 0 8px 20px rgba(11,142,77,0.12);
    border: 1px solid rgba(6, 95, 60, 0.04);
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
}
.card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #07182a;
    text-align: left;
}

/* フォーム */
.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 6px;
}

.form-label { 
    display: flex;
    flex-direction: column;
    gap: 6px; }

.label-text { 
    font-size: 13px;
    color: #6b7280;
}

.input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(7, 20, 30, 0.06);
    background: #fff;
    font-size: 15px;
    outline: none;
    transition: box-shadow .12s ease, border-color .12s ease;
}
.input:focus {
    border-color: rgba(14,110,64,0.16);
    box-shadow: 0 6px 18px rgba(14,110,64,0.06);
}

/* ボタン */
.btn-primary {
    margin-top: 6px;
    padding: 12px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(90deg, #0ea85a, #0b8e4d);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(11,142,77,0.12);
}
.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* フッターリンク */
.card-foot {
    margin-top: 6px;
    display: flex;
    justify-content: center;
}
.btn-link {
    background: transparent;
    border: none;
    color: #0ea85a;
    font-weight: 600;
    cursor: pointer;
    padding: 6px;
}

/* レスポンシブ */
@media (max-width: 420px) {
    .card { padding: 14px; border-radius: 12px; }
    .input { padding: 10px; }
    .btn-primary { padding: 10px; }
}
</style>
