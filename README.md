# 🛒 Shopping Share

> グループで共有する買い物メモアプリ

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)

## 📌 概要

**Shopping Share** は、Vue.js で構築した個人開発WEBアプリです。グループメンバーで買い物リストをリアルタイムに共有できます。Firebase Hosting にデプロイされており、PWA にも対応しています。

🌐 : [https://shopping-share-cd16b.web.app/](https://shopping-share-cd16b.web.app/)

## ✨ 主な機能

- 🛍️ ショッピングアイテムの追加・削除・編集
- 👥 グループメンバーとの買い物リスト共有
- 🔔 メンバー参加時にアプリ内通知
- 🔄 Firebase によるリアルタイムデータ同期
- 📱 PWA対応（ホーム画面へのインストール可能）
- 📲 スマホ対応のレスポンシブデザイン

## 🛠️ 技術スタック

| 技術 | バージョン | 説明 |
|------|-----------|------|
| **Vue.js** | 3.x | フロントエンドフレームワーク |
| **Vue Router** | 5.x | クライアント側ルーティング |
| **Firebase** | 12.x | バックエンド・リアルタイムDB・ホスティング |
| **Tailwind CSS** | 4.x | ユーティリティファーストCSSフレームワーク |
| **Vite** | 6.x | 高速ビルドツール |
| **vite-plugin-pwa** | 1.x | PWA対応プラグイン |
| **EmailJS** | 4.x | フロントエンドからメール送信（お問い合わせ通知） |
| **JavaScript** | ES Module | 実装言語 |

## 📁 プロジェクト構成

```
Shopping-Share/
├── src/                              # メインアプリケーション
├── my-vue-shopping-app/              # ショッピングアプリ（サブプロジェクト）
├── vue-schedule-app/                 # スケジュール管理アプリ（サブプロジェクト）
├── .firebase/                        # Firebase キャッシュ
├── .github/workflows/                # GitHub Actions（CI/CD）
├── .vscode/                          # VSCode設定
├── firebase.json                     # Firebase Hosting設定
├── .firebaserc                       # Firebaseプロジェクト設定
├── index.html                        # エントリーHTML
├── vite.config.js                    # Vite設定
├── tailwind.config.js                # Tailwind CSS設定
├── postcss.config.js                 # PostCSS設定
├── jsconfig.json                     # JavaScript設定
└── package.json                      # 依存関係
```

## 🚀 セットアップ

### 前提条件

- Node.js 18.x 以上
- npm

### インストール手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/YUJI1027/Shopping-Share.git
cd Shopping-Share

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動
npm run dev

# 4. ブラウザで開く
# http://localhost:5173 (または表示されたURL)
```

## 📝 スクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番環境用ビルド
npm run build

# プレビュー（本番ビルドの動作確認）
npm run preview
```

## 🏗️ デプロイ

Firebase Hosting を使用してデプロイしています。

```bash
# ビルド
npm run build

# Firebase にデプロイ
firebase deploy
```

ビルド後の成果物は `dist/` ディレクトリに出力され、Firebase Hosting に公開されます。

## 📦 主要な依存パッケージ

```json
{
  "dependencies": {
    "firebase": "^12.11.0",
    "vite-plugin-pwa": "^1.2.0",
    "vue": "^3.5.13",
    "vue-router": "^5.0.6"
  },
  "devDependencies": {
    "tailwindcss": "^4.2.4",
    "vite": "^6.2.4"
  }
}
```

## 🤝 貢献

このプロジェクトは個人開発プロジェクトですが、フィードバックや提案は大歓迎です。

## 👤 作成者

**YUJI1027**
- GitHub: [@YUJI1027](https://github.com/YUJI1027)

---

**最終更新**: 2026年7月4日
