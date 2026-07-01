import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT
const TEMPLATE_JOIN = import.meta.env.VTE_EMAILJS_TEMPLATE_JOIN

// ================
// EmailJsの初期化
// ================
emailjs.init(PUBLIC_KEY)

// ======================
// お問い合わせメールの通知
// ======================
export const sendContactEmail =  async ({ fromName, fromEmail, message }) => {
    try {
        await  emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, {
            from_name: fromName,
            from_email: fromEmail,
            message: message,
        })
        console.log('お問い合わせメール送信OK')
    } catch (error) {
        console.error('お問い合わせメール送信失敗:', error)
        throw error
    }
}

// ===============================================================
// 参加済み通知
// emailNotify = trueのユーザーに対して、グループ参加の通知メールを送る 
// ===============================================================
export const sendJoinNotification = async ({ newMemberName, groupName, members }) => {
    // emailNotify = trueのユーザーをフィルタリング
    const targets = members.filter(member => member.emailNotify && member.email)

    if (targets.length === 0) {
        console.log('通知対象ユーザーなし')
        return
    }

    // 対象メール送信のPromiseを作成
    const promises = targets.map(member => 
        emailjs.send(SERVICE_ID, TEMPLATE_JOIN, {
            to_email: member.email,
            to_name: member.displayName,
            new_member_name: newMemberName,
            group_name: groupName,
        })
    )

    try {
        await Promise.all(promises)
        console.log('参加通知送信OK: ${targets.length}件')
    } catch (error) {
        console.error('参加通知送信失敗:', error)
        throw error
    }
}