<template>
    <footer class="w-full border-t border-gray-200 bg-white mt-auto py-4 px-6">
        <div class="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">

            <span>
                🛒 Shopping Share
                <span class="ml-2 bg-green-50 text-green-600 border border-green-200 rounded-full px-2 py-0.5 font-mono">
                    v{{ version }}
                </span>
            </span>

            <div class="flex items-center gap-4">
                <RouterLink 
                    to="/privacy"
                    class="hover:text-green-600 transition-colors"
                >
                    プライバシーポリシー
                </RouterLink>
                <span>© 2026 Shopping Share</span>
            </div>
        </div>
    </footer>
</template>

<script setup>
// =================================
// アプリのバージョンを環境変数から取得
// =================================
const version = __APP_VERSION__
</script>