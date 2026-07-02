<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white">

        <!-- ナビゲーション -->
        <nav class="w-full px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
            <span class="text-lg font-black text-green-700 tracking-tight">🛒 Shopping Share</span>
            <div class="flex gap-2">
                <button 
                    @click="goLogin"
                    class="px-4 py-2 rounded-xl text-sm font-semibold text-green-700 border border-green-200 hover:bg-green-50 transition cursor-pointer bg-transparent"
                >
                    ログイン
                </button>
                <button 
                    @click="goRegister"
                    class="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer"
                >
                    新規登録
                </button>
            </div>
        </nav>

        <!-- ヒーローセクション -->
        <section class="px-6 py-16 flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
            <div class="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                家族・友人とお買い物をシェアしよう！
            </div>
            <h1 class="text-4xl font-black text-green-900 leading-tight">
                買い物リストを<br/>みんなで共有する<br />
                <span class="text-transparent bg-clip-text  bg-gradient-to-r from-green-500 to-emerald-600">かんたんアプリ</span>
            </h1>
            <p class="text-gray-500 text-base leading-relaxed">
                Shopping Share は、家族や友人とリアルタイムで買い物リストを共有できるアプリです。
                「あれ買った？」のやり取りをなくして、スムーズなお買い物を。
            </p>
            <div class="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button 
                    @click="goRegister"
                    class="px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-lg shadow-green-200 transition cursor-pointer"
                >
                    無料ではじめる
                </button>
                <button 
                    @click="goLogin"
                    class="px-8 py-3.5 rounded-xl text-base font-bold text-green-700 border border-green-200 hover:bg-green-50 transition cursor-pointer bg-white"
                >
                    ログイン
                </button>
            </div>
        </section>

        <!-- 機能紹介セクション -->
        <section class="px-6 py-12 max-w-4xl mx-auto">
            <h2 class="text-2xl font-black text-green-900 text-center mb-8">主な機能</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                    v-for="feature in  features"
                    :key="feature.title"
                    class="bg-white rounded-xl px-5 py-6 shadow-sm border border-gray-100 flex flex-col gap-3"
                >
                    <span class="text-3xl">{{ feature.icon }}</span>
                    <h3 class="text-base font-bold text-green-900">{{ feature.title }}</h3>
                    <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
                </div>
            </div>
        </section>

        <!-- お知らせセクション -->
        <section class="px-6 py-12 max-w-2xl mx-auto">
            <h2 class="text-2xl font-black text-green-900 text-center mb-6">お知らせ</h2>
            <div class="flex flex-col gap-1">
                <div 
                    v-for="notice in notices"
                    :key="notice.date"
                    class="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-start gap-4"
                >
                    <span class="text-xs text-gray-400 font-medium whitespace-nowrap pt-0.5">{{ notice.date }}</span>
                    <div class="flex flex-col gap-1">
                        <span 
                            class="text-xs font-bold px-2 py-0.5 rounded-full w-fit"
                            :class="notice.badgeClass"
                        >
                            {{ notice.badge }}
                        </span>
                        <p class="text-sm text-gray-700">{{ notice.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- お問い合わせセクション -->
        <section class="px-6 py-12 max-w-2xl mx-auto">
            <h2 class="text-2xl font-black text-green-900 text-center mb-2">お問い合わせ</h2>
            <p class="text-sm text-gray-500 text-center mb-8">ご意見・ご用意</p>
            <div class="bg-white rounded-2xl px-6 py-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-medium text-gray-500">お名前</label>
                    <input 
                        v-model="form.name"
                        type="text"
                        placeholder="お買い物　太郎"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    />
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-medium text-gray-500">メールアドレス</label>
                    <input 
                        v-model="form.email"
                        type="email"
                        placeholder="example@email.com"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    />
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-medium text-gray-500">内容</label>
                    <textarea 
                        v-model="form.message"
                        placeholder="お問い合わせ内容を入力してください"
                        rows="4"
                        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition resize-none"
                    />
                </div>

                <button 
                    @click="submitContact"
                    :disabled="isSending"
                    class="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ isSending ? '送信中...' : '送信する' }}
                </button>

                <!-- 送信結果メッセージ -->
                <p 
                    v-if="contactResult"
                    class="text-center text-sm"
                    :class="contactResult.success ? 'text-green-600' : 'text-red-500'"
                >
                    {{ contactResult.message }}
                </p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendContactEmail } from '../services/emailService'

import AppFooter from '../components/AppFooter.vue'

// ==================
// 
// ==================
const router = useRouter()
const goLogin = () => router.push('/login')
const goRegister = () => router.push('/register')

// ==========
// 機能紹介
// ==========
const features = [
    {
        icon: '📋️',
        title: 'リアルタイム共有',
        description:  'グループメンバーとリストをリアルタイムで同期。誰かが追加・更新するとすぐに反映されます。',
    },
    {
        icon: '👥',
        title: 'グループ管理',
        description: '招待URLを送るだけで簡単にグループ参加。家族・友人・職場など複数グループを使い分けられます。',
    },
    {
        icon: '🔔',
        title: 'アプリ内通知',
        description: '新しいメンバーが参加するとグループ内にお知らせが表示されます。大事な情報のを見逃しません。',
    },
]

// ==========
// お知らせ
// ==========
const notices = [
    {
        date: '2026.06.01',
        badge: 'リリース',
        badgeClass: 'bg-green-100 text-green-700',
        text: 'Shopping Share v1.0.0 をリリースしました',
    },
    {
        date: '2026.07.01',
        badge: 'アップデート',
        badgeClass: 'bg-emerald-100 text-emerald-700',
        text: 'v1.1.0：LandingPage追加、メール認証、アプリ内通知履歴を追加しました',
    }
]

// ====================
// お問い合わせフォーム
// ====================
const form = ref({ name: '', email: '', message: '' })
const isSending = ref(false)
const contactResult = ref(null)

const submitContact = async () => {
    if (!form.value.name || !form.value.email || !form.value.message) {
        contactResult.value = { success: false, message: 'すべての項目を入力してください。' }
        return
    }

    isSending.value = true
    contactResult.value = null

    try {
        await sendContactEmail({
            fromName: form.value.name,
            fromEmail: form.value.email,
            message: form.value.message,
        })
        contactResult.value = { success: true, message: 'お問い合わせを送信しました。ありがとうございます！' }
        form.value = { name: '', email: '', message: '' }
    } catch (e) {
        contactResult.value = { success: false, message: '送信に失敗しました。時間をおいて再度お試しください。' }
    } finally {
        isSending.value = false
    }
}
</script>