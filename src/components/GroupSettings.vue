<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-8 flex justify-center">
        <div class="w-full max-w-lg flex flex-col gap-4 animate-fade-up">
            <div class="flex items-center gap-3">
                <button 
                    class="text-sm font-semibold text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg transition cursor-pointer bg-transparent border border-none" 
                    @click="goBack"
                >
                    ⇐ 戻る
                </button>
                <h1 class="text-xl font-black text-gray-900">グループ設定</h1>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">グループ名</h2>
                <div class="flex gap-2">
                    <input
                        v-model="groupName"
                        class="flex px-4  py-3 rounded-xl border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                        placeholder="グループ名"
                    />

                    <button 
                        class="px-4 py-3 rounded-xl text-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-green-200 transition cursor-pointer whitespace-nowrap" 
                        @click="saveGroupName"
                    >
                        変更
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wide">参加メンバー</h2>
                <p class="text-xs text-gray-400">グループに参加しているメンバーを表示しています。</p>
                <ul class="flex flex-col gap-2 mt-1">
                    <li 
                        v-for="member in memberUsers" 
                        :key="member.uid"
                        class="flex items-center gap-2 px-3 py-2.5 bg-green-100 text-green-700"
                    >
                    <span class="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {{ member.name.charAt(0) }}
                    </span>
                    {{ member.name }}
                    </li>
                </ul>
            </div>

            <div class="bg-white rounded-2xp p-5 shadow-sm border border-red-50 flex flex-col gap-3">
                <h2 class="text-sm font-bold text-red-600 uppercase tracking-wide">グループ退出</h2>
                <p class="text-xs text-gray-400 leading-relaxed">
                    現在参加しているグループから退出することができます。<br>
                    再参加する場合はメンバーから招待してもらう必要があります。
                </p>
                <button 
                    @click="leaveGroup" 
                    class="self-start px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition cursor-pointer"
                >
                    グループを退出する
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {  ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { db, auth } from '../firebase'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()

// =======
// state
// =======
const groupId = route.params.id
const groupName = ref('')
const groupData = ref(null)
const memberUsers = ref([])

// ===============
// 初期読み込み
// ===============
onMounted(async () => {
    await loadGroup()
})

// ===============
// グループ情報取得
// ===============
const loadGroup = async () => {
    const groupRef = doc(db, "groups", groupId)
    const groupSnap = await getDoc(groupRef)

    if (!groupSnap.exists()) return

    groupData.value = groupSnap.data()
    groupName.value = groupSnap.data().name || "グループ名なし"
    const members = groupSnap.data().members || []

    const memberPromises = members.map(async (uid)  => {
        const snap = await getDoc(doc(db, "publicUsers", uid))

        if (!snap.exists()) {
            return {
                uid,
                name: "不明なユーザー"
            }
        }

        return {
            uid,
            name: snap.data().name || "名前なし"
        }
    })

    memberUsers.value = await Promise.all(memberPromises)
}

// =================
// グループ名保存処理
// =================
const saveGroupName = async () => {
    await updateDoc(
        doc(db,"groups", groupId),
        {
            name: groupName.value
        }
    )

    alert("グループ名を変更しました。")
}

// ===============
// グループ退出
// ===============
const leaveGroup = async ()  => {
    const uid =  auth.currentUser.uid

    await updateDoc(
        doc(db, "groups", groupId),
        {
            members: arrayRemove(uid)
        }
    )

    await updateDoc(
        doc(db, "users", uid),
        {
            groups: arrayRemove(groupId)
        }
    )

    alert("グループを退出しました。")
    router.push('/home')
}

// ===============
// Home.vueへ遷移
// ===============
const goBack = () => {
    router.back()
}

</script>
