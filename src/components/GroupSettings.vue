<template>
    <div class="page-container">
        <div class="page-inner">
            <div class="card" role="region" aria-label="グループ設定">
                <div class="card-head"  style="display: flex; align-items: center; gap: 12px;">
                    <button class="back-button" @click="goBack">⇐ 戻る</button>
                    <h1 class="card-title">グループ設定</h1>
                </div>
            </div>

            <section class="section">
                <h2 class="section-title">参加グループ名</h2>

                <div class="form">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <input
                            v-model="groupName"
                            class="input"
                            placeholder="グループ名"
                        />

                        <button class="btn-primary" @click="saveGroupName">
                            グループ名変更
                        </button>
                    </div>
                </div>

            </section>

            <section class="section">
                <h2 class="section-title">参加メンバー</h2>
                <p class="section-text">グループに参加しているメンバーを表示しています。</p>
                <ul class="member-list">
                    <li v-for="member in memberUsers" :key="member.uid">
                        {{ member.name }}
                    </li>
                </ul>
            </section>

            <section class="section">
                <h2 class="section-title">グループ退出</h2>
                <p class="section-text">現在参加しているグループから退出することができます。<br>グループに参加したい場合は、再度参加メンバーから招待してもらうことで参加できます。</p>
                <button @click="leaveGroup" class="btn-sm btn-ghost move-btn">グループを退出する</button>
            </section>
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

// ===============
// state
// ===============
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

// ===============
// グループ名保存処理
// ===============
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
    router.push('/')
}

// =============
// Home.vueへ遷移
// ============
const goBack = () => {
    router.back()
}

</script>

<style scoped>
.page-container {
    min-height: 100vh;
    background: linear-gradient(180deg, #f1fbf4, #ffffff);
    padding: 24px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Noto Sans JP", "Segoe UI", Roboto, sans-serif;
    color: #0f172a;
}

.page-inner {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 0 12px;
    justify-content: center;
}

.card {
    width: 100%;
    background: #ffffff;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 8px 30px rgba(7, 37, 20, 0.06);
    border: 1px solid rgba(6, 95, 60, 0.04);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.card-head {
    margin-bottom: 6px; 
    display:flex; 
    align-items:center; 
    gap:12px; 
}

.card-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #07182a;
}

.section {
    margin-top: 15px; 
}

.section-title {
    margin: 0 0 8px 0;
    font-size: 25px;
    color: #0f172a;
    font-weight: 700;
}

.section-title {
    margin: 0 0 15px 0;
    font-size: 25px;        
    line-height: 1.3;
    color: #0f172a;        
    font-weight: 700;       
}

.section-text {
    margin: 0 0 10px 0;
    font-size: 13px;        
    line-height: 1.4;
    color: #6b7280;    
    font-weight: 400;   
}

.label-text {
    font-size: 13px;
    color: #6b7280;
}

.form { 
    display:flex; 
    flex-direction:column; 
    gap:10px; 
}

.form-label { 
    display:flex; 
    flex-direction:column; 
    gap:6px; 
}

.label-text { 
    font-size:13px; 
    color: #6b7280; 
}

.input, select, textarea {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(7,20,30,0.06);
    background: #ffffff;
    font-size: 15px;
    outline: none;
    transition: box-shadow .12s ease, border-color .12s ease;
    box-sizing: border-box;
}

.input:focus, select:focus, textarea:focus {
    border-color: rgba(14,110,64,0.16);
    box-shadow: 0 6px 18px rgba(14,110,64,0.06);
}

.btn-primary {
    padding: 10px 14px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(90deg, #0ea85a, #0b8e4d);
    color: white;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(11,142,77,0.12);
}

.btn-ghost {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid rgba(2,6,23,0.06);
    background: transparent;
    cursor: pointer;
}

.btn-sm {
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 0.95rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 1px solid rgba(2,6,23,0.06);
    color: #0f172a;
    transition: background .12s ease, transform .06s ease;
}
.btn-sm:active { 
    transform: translateY(1px); 
}

.btn-sm:focus { 
    outline: 3px solid rgba(14,110,64,0.12); 
    outline-offset: 2px; 
}

.move-btn {
    color: #b91c1c;
    border-color: rgba(185,28,28,0.12);
    background: rgba(249, 242, 242, 0.6);
    font-weight: 700;
}

.move-btn:hover {
    background: rgba(185,28,28,0.06);
}

.move-btn:focus {
    outline: 3px solid rgba(185,28,28,0.12);
    outline-offset: 2px;
}

.btn-sm.btn-ghost {
    background: transparent;
    padding: 8px 10px;
}

.btn-sm.btn-ghost.move-btn {
    background: rgba(249, 242, 242, 0.6);
}

.back-button {
    background: transparent;
    border: none;
    color: #0b5b30;
    cursor: pointer;
    font-weight: 600;
    padding: 6px 8px;
    border-radius: 6px;
}

/* レスポンシブ */
@media (max-width: 880px) {
    .page-inner { 
        padding: 0 8px;
    }
    .card { 
        padding: 16px; 
    }
    .section-text {
        font-size: 14px;
    }
}

@media (max-width: 420px) {
    .card { 
        padding: 14px; 
        border-radius: 10px; 
    }
    .input { 
        padding: 10px; 
    }
    .btn-primary { 
        padding: 10px; 
    }
    .section-text {
        font-size: 10px;
    }
}
</style>