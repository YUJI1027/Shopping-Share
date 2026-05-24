<template>
    <div class="page-container">
        <Header />
        <div v-if="isLoading" class="loading-over-lay">
            <div class="spinner"></div>
        </div>

        <div class="top-bar card">
            <div class="user-info">
                <div class="user-name" @click="goProfile">
                    {{ userName }}
                </div>
            </div>
            <div class="actions">
                <button @click="logout" class="logout-link">
                    ログアウト
                </button>
            </div>
        </div>

        <div class="card content">
            <section class="groups-section">
                <h3 @click="goGroupSetting" class="section-title">グループ：{{ groupName || "未設定" }}</h3>
                <div class="field">
                    <label for="group-select" class="label-text">グループを選択　【グループ数：{{ userGroups.length }}】</label>
                    <select id="group-select" v-model="groupId" @change="switchGroup($event.target.value)" class="input">
                        <option value="" disabled>選択してください</option>
                        <option v-for="group in userGroups" :key="group.id" :value="group.id" :selected="group.id === groupId">
                            {{ group.name }}
                        </option>
                    </select> 
                </div>
            </section>

            <section class="form-section">
                <div class="field">
                    <input v-model="newGroupName" placeholder="新しいグループ名" class="input"/>
                    <button @click="createNewGroup" class="btn-primary">グループ作成</button>
                </div>
            </section>
        </div>

        <button @click="showForm=true" class="fab" aria-label="アイテムを追加">＋</button>
        <button @click="showForm=true" class="fab" aria-label="アイテムを追加">
            <span class="fab-icon">＋</span>
            <span class="fab-text">追加</span>
        </button>

        <div class="group-actions card">
            <button @click="copyShareLink" class="btn-ghost">共有リンクをコピーする</button>
        </div>
        
        <AddItemForm 
            v-if="showForm"
            :editingItem="editingItem"
            @add-item="AddItem"
            @close="closeForm"
        />
        <div class="list-header card">
            <div class="remaining-left">
                <span class="remaining-label">残り</span>
                <span class="remaining-count">{{ remainingCount }}件</span>
            </div>
        </div>

        <ShoppingList 
            :items="items"
            @delete-item="deleteItem"
            @toggle-item="toggleItem"
            @edit-memo="editMemo"
            @edit-item="startEdit"
        />

        <ToastMessage 
        :message="toastMessage"
        :visible="showToast"
        />
    </div>
</template>

<script setup>
import { db, auth } from "../firebase"
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted, computed } from 'vue'
import  {
    onAuthStateChanged,
    reload,
    signOut,
    updateEmail,
    updatePassword,
} from "firebase/auth"
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    setDoc,
    getDoc,
    arrayUnion,
    serverTimestamp,
    arrayRemove
} from "firebase/firestore"

// コンポーネントのインポート
import Header from './Header.vue'
import AddItemForm from './AddItemForm.vue'
import ShoppingList from './ShoppingList.vue'
import ToastMessage from "./ToastMessage.vue"

const router = useRouter()
const route = useRoute()

// ========================
// state
// ========================
const user = ref(null)  // ユーザー情報を管理するためのref
const userName = ref("") // ユーザー名の状態を管理するためのref
const userGroups = ref([])  // 所属グループ取得のためのref

const groupId = computed(() => route.query.group) 
const groupName = ref("")   // グループ名の状態を管理するためのref
const newGroupName = ref("")    // 新しいグループ名を管理するためのref
const currentGroup = ref(null)    // 現在のグループ情報を管理するためのref

const items = ref([])   // データ管理のためのref
const showForm = ref(false) // フォームの表示状態を管理するためのref
const editingItem = ref(null) // 編集中のアイテムを状態管理するためのref

const toastMessage = ref("") // トーストメッセージの状態を管理するためのref
const showToast = ref(false) // トーストの表示状態を管理するためのref

const isLoading = ref(false) // ローディング状態を管理するためのref

// ========================
// snapshot管理
// ========================
let unsubscribeItems = null
let unsubscribeGroup = null

const reloadGroup = (gid) => {
    if (!gid || !user.value) return

    if (unsubscribeItems) unsubscribeItems()
    if (unsubscribeGroup) unsubscribeGroup()

    unsubscribeItems = onSnapshot(
        collection(db, "groups", gid, "items"),
        (snapshot) => {
            items.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            isLoading.value = false
        },
        (error) => {
            console.error("権限エラー:", error)
            isLoading.value = false
            displayToast("このグループにアクセスする権限がありません。")
        }
    )

    unsubscribeGroup = onSnapshot(
        doc(db, "groups", gid),
        (docSnap) => {
            if (docSnap.exists()) {
                currentGroup.value = docSnap.data()
                groupName.value = docSnap.data().name
            }
        }, (error) => {
            console.error("権限エラー:", error)
            displayToast("このグループにアクセスする権限がありません。")
        }
    )
}

// ======================
// 初期処理
// ======================
onMounted(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {

        if (!firebaseUser) {
            router.push('/login')
            return
        }

        user.value = firebaseUser

        await initUser(firebaseUser)
        await loadUserGroups()

        if (!groupId.value) {
            const newId = crypto.randomUUID()
            router.replace({ path: '/', query: { group: newId } })
            return
        }

        await ensureJoinedGroup(groupId.value)
        reloadGroup(groupId.value)
    })
})

// ======================
// グループ切り替え監理
// ======================
watch(() => route.query.group, async (newGroupId)  => {
    if (!newGroupId) return

    isLoading.value = true

    await ensureJoinedGroup(newGroupId)

    reloadGroup(newGroupId)
})

// ======================
// ユーザー初期化
// ======================
const initUser = async (firebase) => {
    const userRef = doc(db, "users", firebase.uid)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
        await setDoc(userRef, {
            name: "名前なし",
            email: firebase.email,
            groups: []
        })
    }

    const updateDoc = await getDoc(userRef)
    userName.value = updateDoc.data().name
}

// ======================
// グループ取得
// =====================
const loadUserGroups = async () => {
    const userDoc = await getDoc(doc(db, "users", user.value.uid))
    if (!userDoc.exists()) return

    const groupIds = userDoc.data().groups || []
    
    const promises = groupIds.map(gid => getDoc(doc(db, "groups", gid)))
    const results = await Promise.all(promises)

    userGroups.value = results.filter(doc => doc.exists()).map((doc, i) => ({
        id: groupIds[i],
        name: doc.exists() ? doc.data().name : "No Name"
    }))
}

// ======================
// グループ作成
// =====================
const createNewGroup = async () => {
    if (!newGroupName.value) {
        alert("グループ名を入力してください")
        return
    }

    const newGroupId = crypto.randomUUID()

    // groupsに新しいグループを作成
    await setDoc(doc(db, "groups", newGroupId), {
    name: newGroupName.value,
    members: [user.value.uid],
    ownerId: user.value.uid,
    isPublic: true,
    createdAt: serverTimestamp()
    })

    // ユーザー更新
    await updateDoc(doc(db, "users", user.value.uid), { groups: arrayUnion(newGroupId) })

    newGroupName.value = ""

    // ユーザーのグループ情報を再読み込み
    await loadUserGroups()

    // 新しいグループに切り替える
    router.replace({ path: '/', query: { group: newGroupId } })
}

// ======================
// グループ切り替え
// ====================
const switchGroup = async (gid) => {
    if  (gid === groupId.value) return

    isLoading.value = true

    router.push({ path: '/', query: { group: gid } })
    displayToast("🔄 グループを切り替えました")
}

// ======================
// 初回参加判定
// =====================
const ensureJoinedGroup = async (gid) => {
    if (!user.value) return

    const ref = doc(db, "groups", gid)
    const snap = await getDoc(ref)

    if (!snap.exists()) return
    const members = snap.data().members || []

    if (members.includes(user.value.uid)) return

    try {
        const newMembers = [...members, user.value.uid]

        await updateDoc (ref, 
        { members: newMembers })

        await updateDoc(doc(db, "users", user.value.uid),
        { groups: arrayUnion(gid) })
        
        console.log("グループに参加しました:", gid)

    } catch (error) {
        throw error
    }
}

// ======================
// トースト表示関数
// ======================
const displayToast = (message) => {
    toastMessage.value = message
    showToast.value = true

    setTimeout(() => {
    showToast.value = false
    },  3000)
}

// ======================
// アイテム追加/更新
// =====================
const AddItem = async (itemName, quantity, memo) => {
    if (!itemName) return
    
    if (editingItem.value?.id) {
    await updateDoc(
        doc(
        db,
        "groups",
        groupId.value,
        "items",
        editingItem.value.id
        ),
        {
        name: itemName,
        quantity:  quantity ||  1,
        memo: memo || '',
        updatedAt: serverTimestamp()
        }
    )
    displayToast("🔄  更新しました")
    editingItem.value =null
    } else {
    await addDoc(
    collection(
        db,
        "groups",
        groupId.value,
        "items"
    ),
    {
        name: itemName,
        quantity: quantity || 1,
        memo: memo || '',
        userName: userName.value || "名無し",
        isDone: false,
        doneBy: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    }
    )
    displayToast("🛒  追加しました")
    }
    showForm.value = false
}

// ========================
// アイテムの編集開始する関数
// ========================
const startEdit = (item) => {
    editingItem.value = item
    showForm.value = true
}

// ========================
// フォームを閉じる関数
// ========================
const closeForm = () => {
    showForm.value = false
    editingItem.value = null
}

// ======================
// アイテム削除
// =====================
const deleteItem = async (id) => {

    await deleteDoc(
    doc(
        db,
        "groups",
        groupId.value,
        "items",
        id
    )
    )
    displayToast("🗑️  削除しました")
    items.value = items.value.filter(item => item.id !== id)
}

// ======================
// ログアウト
// =====================
const logout = async () => {
    if (unsubscribeItems) unsubscribeItems()
    if (unsubscribeGroup) unsubscribeGroup()

    await signOut(auth)
    router.push('/login')
    
    user.value = null
    items.value = []
}

// ======================
// アイテムの完了状態を切り替える
// ======================
const toggleItem = async (id, isDone) => {
    if (isDone === undefined) return

    await updateDoc(
    doc(
        db,
        "groups",
        groupId.value,
        "items",
        id
    ),
    {
        isDone: isDone,
        doneBy: isDone ? userName.value : "" 
    }
    )
    displayToast(isDone ? "✅️  checkしました" : "checkを外しました")
}

const copyShareLink = async () => {
    await navigator.clipboard.writeText(location.href)
    displayToast("🔗  共有リンクをコピーしました")
}

// ======================
// グループ名を読み込む
// ======================
const loadGroupName = async () => {
    const groupDoc = await getDoc(
    doc(db, "groups", groupId.value)
    )

    if (groupDoc.exists())  {
    groupName.value = groupDoc.data().name
    }
}

// ======================
// アイテムのカウント
// ======================
const remainingCount = computed(() => {
    return items.value.filter(item => !item.isDone).length
})

// ======================
// 管理者判定
// ======================
const isAdmin = computed(() => {
    return currentGroup.value?.members?.some(
        m => m.uid === user.value.uid && m.role === "admin"
    )
})

// ======================
// プロフィールへ遷移
// ======================
const goProfile = () => {
    router.push('/profile')
}

// ======================
// グループ管理画面へ遷移
// ======================
const goGroupSetting = () => {
    router.push(`/group/${groupId.value}/setting`)
}
</script>