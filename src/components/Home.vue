<template>
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-5 flex flex-col gap-4 items-center box-border">
        
        <div 
            v-if="isLoading" 
            class="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-content"
        >
            <div class="w-10 h-10 rounded-full border-4 border-green-200 border-t-green-500  animate-spin-custom"></div>
        </div>

        <div class="w-full max-w-2xl flex flex-col gap-4">
            
            <Header />
            
            <div class="w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center justify-between">
                <button class="text-base font-bold text-green-800 hover:text-green-500  transition cursor-pointer bg-transparent border-none"
                        @click="goProfile">
                    {{ userName }}
                </button>
                <button @click="logout" 
                        class="text-sm text-red-500 hover:underline cursor-pointer bg-transparent border-none">
                    ログアウト
                </button>
            </div>

            <div class="w-full bg-white rounded-2xl  px-4  py-4 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <button @click="goGroupSetting"
                            class="text-lg font-bold text-green-900 hover:text-green-500 transition cursor-pointer bg-transparent border-none"
                    >
                        {{ groupName || "未設定" }}   
                    </button>
                </div>
                
                <div class="flex flex-col gap-1.5">
                    <label 
                        for="group-select" 
                        class="text-xs text-gray-500 font-medium"
                    >
                        グループを選択（{{ userGroups.length }}件）
                    </label>
                    <select 
                        id="group-select" 
                        v-model="groupId" 
                        @change="switchGroup($event.target.value)" 
                        class="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
                    >
                        <option value="" disabled>選択してください</option>
                        <option 
                            v-for="group in userGroups" 
                            :key="group.id" 
                            :value="group.id" 
                            :selected="group.id === groupId"
                        >
                            {{ group.name }}
                        </option>
                    </select> 
                </div>

                <div class="flex gap-2 pt-1">
                    <input 
                        v-model="newGroupName" 
                        placeholder="新しいグループ名を入力" 
                        class="flex-1 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-500 bg-green-100 hover:opacity-90 shadow-md shadow-green-200 transition  cursor-pointer whitespace-nowrap"
                    />
                    <button 
                        @click="createNewGroup" 
                        class="px-4  py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 shadow-md shadow-green-200 transition cursor-pointer whitespace-nowrap"
                    >
                        グループ作成
                    </button>
                </div>
            </div>

            <div class="w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center justify-between">
                <span class="text-sm text-gray-500">買い物を共有しよう！</span>
                <button 
                    @click="copyShareLink" 
                    class="text-sm font-semibold text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg transition cursor-pointer border border-green-100"
                >
                    🔗 リンクをコピー
                </button>
            </div>

            <div class="w-full bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-2">
                <span class="text-sm  text-gray-500">残り</span>
                <span class="text-xl font-black text-gray-900">{{ remainingCount }}</span>
                <span class="text-sm  text-gray-500">件</span>
            </div>

            <ShoppingList 
                :items="items"
                @delete-item="deleteItem"
                @toggle-item="toggleItem"
                @edit-memo="editMemo"
                @edit-item="startEdit"
            />
        </div>

        <button 
            @click="showForm=true" 
            class="fixed right-5 bottom-6 z-[1000] flex items-center gap-2 h-14 px-4 rounded-full bg-gradient-to-r  from-green-500 to-emerald-600 text-white font-bold shadow-green-300 hover:opacity-90 transition cursor-pointer md:rounded-xl md:h-12 md:px-5" 
            aria-label="アイテムを追加"
        >
            <span class="text-xl leading-none">＋</span>
            <span class="hidden md:inline text-sm">追加</span>
        </button>

        <AddItemForm 
            v-if="showForm"
            :editingItem="editingItem"
            @add-item="AddItem"
            @close="closeForm"
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

// ========
// state
// ========
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

// ==============
// snapshot管理
// ==============
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

// ==========
// 初期処理
// ==========
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

// ==============
// ユーザー初期化
// ==============
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

// =============
// グループ取得
// =============
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

// ============
// グループ作成
// ============
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

// ================
// グループ切り替え
// ================
const switchGroup = async (gid) => {
    if  (gid === groupId.value) return

    isLoading.value = true

    router.push({ path: '/', query: { group: gid } })
    displayToast("🔄 グループを切り替えました")
}

// ==============
// 初回参加判定
// ==============
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

// ===============
// トースト表示関数
// ===============
const displayToast = (message) => {
    toastMessage.value = message
    showToast.value = true

    setTimeout(() => {
    showToast.value = false
    },  3000)
}

// ==================
// アイテム追加/更新
// ==================
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

// ===================
// フォームを閉じる関数
// ===================
const closeForm = () => {
    showForm.value = false
    editingItem.value = null
}

// =============
// アイテム削除
// =============
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

// ============
// ログアウト
// ============
const logout = async () => {
    if (unsubscribeItems) unsubscribeItems()
    if (unsubscribeGroup) unsubscribeGroup()

    await signOut(auth)
    router.push('/login')
    
    user.value = null
    items.value = []
}

// ============================
// アイテムの完了状態を切り替える
// ============================
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

// ===================
// グループ名を読み込む
// ===================
const loadGroupName = async () => {
    const groupDoc = await getDoc(
    doc(db, "groups", groupId.value)
    )

    if (groupDoc.exists())  {
    groupName.value = groupDoc.data().name
    }
}

// ==================
// アイテムのカウント
// ==================
const remainingCount = computed(() => {
    return items.value.filter(item => !item.isDone).length
})

// ============
// 管理者判定
// ============
const isAdmin = computed(() => {
    return currentGroup.value?.members?.some(
        m => m.uid === user.value.uid && m.role === "admin"
    )
})

// ==================
// プロフィールへ遷移
// ==================
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