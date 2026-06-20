<template>
    <div class="min-h-screen bg-gray-50 py-10 px-4">
        <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">

            <div class="mb-8">
                <button 
                    @click="$router.back()"
                    class="text-sm text-green-600 hover:text-green-800 mb-4 flex items-center gap-1"
                >
                    ⇐戻る
                </button>
                <h1 class="text-2xl font-bold text-gray-800">プライバシーポリシー</h1>
                <p class="text-sm text-gray-500 mt-1">最終更新日：2026年6月17日</p>
            </div>

            <div class="space-y-8 text-gray-700 text-sm leading-relaxed">
                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">１．収集する情報</h2>
                    <p class="mb-3">本アプリでは、以下の情報を収集します。</p>
                    <table class="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                        <thead class="bg-green-50 text-gray-700">
                            <tr>
                                <th class="px-4 py-2 font-medium text-left">情報の種類</th>
                                <th class="px-4 py-2 font-medium text-left">収集目的</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t border-gray-100">
                                <td class="px-4 py-2">メールアドレス</td>
                                <td class="px-4 py-2">ユーザー登録・ログイン時</td>
                            </tr>
                            <tr class="border-t border-gray-100 bg-gray-50">
                                <td class="px-4 py-2">買い物リストのデータ</td>
                                <td class="px-4 py-2">アプリ使用中</td>
                            </tr>
                            <tr class="border-t border-gray-100">
                                <td class="px-4 py-2">グループ情報</td>
                                <td class="px-4 py-2">グループ作成・参加時</td>
                            </tr>
                        </tbody>
                    </table>
                    <p class="mt-3 text-gray-500">
                        パスワードはFirebase Authenticationにより安全に管理され、本アプリが直接参照・保存することはありません。
                    </p>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">２．情報の利用目的</h2>
                    <ul class="list-disc list-inside space-y-1 text-gray-600">
                        <li>ユーザー認証およびアカウント監理</li>
                        <li>買い物リストのグループ共有機能の提供</li>
                        <li>アプリの改善・新機能の開発・不具合対応</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">３．第三者への提供</h2>
                    <p>収集した個人情報は、以下の場合を除き第三者に提供しません。</p>
                    <ul class="list-disc list-inside space-y-1 text-gray-600 md-2">
                        <li>ユーザー本人の同意がある場合</li>
                        <li>法令に基づく場合</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800  mb-2">４．利用する外部サービス</h2>
                    <p class="mb-3">本アプリは<strong>Google Firebase</strong>を利用しています。</p>
                    <ul class="list-disc list-inside space-y-1 text-gray-600">
                        <li><strong>Firebase Authentication</strong>：ログイン認証の管理</li>
                        <li><strong>Cloud Firestore</strong>：データの保存・同期</li>
                        <li><strong>Firebase Hosting</strong>：アプリの配信</li>
                    </ul>
                    <p class="mt-3">
                        詳細は
                        <a
                            href="https://firebase.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-green-600 underline hover:text-green-800"
                        >
                            Google のプライバシーポリシー
                        </a>
                        をご参照ください。
                    </p>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">５．データの保存・管理</h2>
                    <ul class="list-disc list-inside space-y-1 text-gray-600">
                        <li>データはGoogleのサーバー（Firebase）上に保存されます</li>
                        <li>通信はSSL/TLSにより暗号化されています</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">６．個人情報の削除</h2>
                    <p>
                        アカウントの削除をご希望の場合は、本アプリの管理にご連絡ください。
                        削除後、関連する個人情報はFirebaseから削除されます。
                    </p>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">７．お問い合わせ</h2>
                    <p>
                        <a 
                            href="https://github.com/YUJI1027/Shopping-Share/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-green-600 underline hover:text-green-800"
                        >
                            GitHub issues
                        </a>
                        よりお問い合わせください。
                    </p>
                </section>

                <section>
                    <h2 class="text-base font-semibold text-gray-800 mb-2">８．ポリシーの変更</h2>
                    <p>
                        本ポリシーは予告なく変更されることがあります。
                        重大な変更がある場合は、本ページおよびアプリ内でお知らせします。
                    </p>
                </section>
            </div>
        </div>
    </div>
</template>