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
                <a 
                    href="https://github.com/YUJI1027/Shopping-Share/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-green-600 transition-colors"
                >
                    更新履歴
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
// =================================
// アプリのバージョンを環境変数から取得
// =================================
import { version } from '../../package.json'
</script>