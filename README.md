# 🛒 Shopping Share

> グループで共有する買い物メモアプリ

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)

## 📌 概要

**Shopping Share** は、複数のVue.jsアプリケーションで構成される個人開発プロジェクトです。グループメンバーで買い物リストを共有したり、スケジュールを管理したりできます。

## ✨ 主な機能

### 🛍️ My Vue Shopping App
- ✅ ショッピングアイテムの追加・削除・編集
- 📊 残りのアイテム数の表示
- 📱 スマホ対応のレスポンシブデザイン
- 🎨 ブルー基調のモダンなUI

### 📅 Vue Schedule App
- 🗓️ イベント管理とカレンダー表示
- 👥 グループメンバーとの連携
- ⚙️ カスタマイズ可能な設定
- 🎯 直感的なイベント追加・編集機能

## 🛠️ 技術スタック

| 技術 | 説明 |
|------|------|
| **Vue.js 3** | フロントエンドフレームワーク |
| **TypeScript** | 静的型付け言語 |
| **Vite** | 高速ビルドツール |
| **Vuex** | 状態管理 |
| **Vue Router** | クライアント側ルーティング |
| **CSS3** | レスポンシブデザイン対応 |

## 📁 プロジェクト構成

```
Shopping-Share/
├── my-vue-shopping-app/              # ショッピングアプリ
│   ├── src/
│   │   ├── components/               # UIコンポーネント
│   │   ├── views/                    # ページコンポーネント
│   │   ├── assets/                   # スタイルと静的ファイル
│   │   ├── App.vue                   # ルートコンポーネント
│   │   └── main.ts                   # アプリケーション設定
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
│
└── vue-schedule-app/                 # スケジュール管理アプリ
    ├── src/
    │   ├── components/               # UIコンポーネント（Header, Sidebar等）
    │   ├── views/                    # ページコンポーネント（Home, Calendar等）
    │   ├── layouts/                  # レイアウトコンポーネント
    │   ├── store/                    # Vuexストア（状態管理）
    │   ├── router/                   # ルーティング設定
    │   ├── composables/              # Vue Composables（認証、グループ管理等）
    │   ├── assets/                   # スタイルと静的ファイル
    │   ├── utils/                    # ユーティリティ関数
    │   ├── types/                    # TypeScript型定義
    │   ├── App.vue                   # ルートコンポーネント
    │   └── main.ts                   # アプリケーション設定
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── README.md
```

## 🚀 セットアップ

### 前提条件
- Node.js 16.x 以上
- npm または yarn

### インストール手順

#### My Vue Shopping App

```bash
# 1. リポジトリをクローン
git clone https://github.com/YUJI1027/Shopping-Share.git
cd Shopping-Share

# 2. ディレクトリに移動
cd my-vue-shopping-app

# 3. 依存関係をインストール
npm install

# 4. 開発サーバーを起動
npm run dev

# 5. ブラウザで開く
# http://localhost:5173 (または表示されたURL)
```

#### Vue Schedule App

```bash
# 1. リポジトリをクローン
git clone https://github.com/YUJI1027/Shopping-Share.git
cd Shopping-Share

# 2. ディレクトリに移動
cd vue-schedule-app

# 3. 依存関係をインストール
npm install

# 4. 開発サーバーを起動
npm run dev

# 5. ブラウザで開く
# http://localhost:5173 (または表示されたURL)
```

## 📚 使用方法

### My Vue Shopping App
1. アプリケーションを起動する
2. 入力フィールドにアイテムを入力
3. **Add** ボタンをクリックして買い物リストに追加
4. アイテムの編集・削除が可能
5. 購入済みアイテムは自動的にカウント表示

### Vue Schedule App
1. アプリケーションを起動する
2. ホーム画面でグループを選択
3. カレンダービューでイベントを確認
4. **Add Event** ボタンで新規イベントを作成
5. イベント詳細の編集・削除が可能

## 🎨 デザイン特徴

- **カラースキーム**: ブルー基調のモダンなデザイン
- **レスポンシブ対応**: スマートフォン・タブレット・デスクトップ対応
- **ユーザーフレンドリー**: 直感的なUI/UXデザイン
- **アクセシビリティ**: 視認性の高いフォントサイズと色合い

## 🏗️ ビルド

### 本番環境用ビルド

```bash
# 各アプリケーションのディレクトリで実行
npm run build
```

ビルド後の成果物は `dist/` ディレクトリに出力されます。

## 📝 スクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番環境用ビルド
npm run build

# プレビュー（本番ビルドの動作確認）
npm run preview
```

## 🔧 カスタマイズ

### スタイルの変更
各アプリケーションの `src/assets/styles/` ディレクトリ内のCSSファイルを編集してください。

- `variables.css`: カラーパレットの定義
- `base.css`: 基本スタイル
- `responsive.css`: レスポンシブブレークポイント

### 状態管理（Vue Schedule App）
`src/store/index.ts` でVuexストアを設定しています。必要に応じてアクションやミューテーションを追加できます。

## 📦 主要な依存パッケージ

- `vue@3.x` - UIフレームワーク
- `vue-router@4.x` - ルーティング
- `vuex@4.x` - 状態管理（vue-schedule-app）
- `typescript@5.x` - 静的型付け
- `vite@5.x` - ビルドツール

詳細は各アプリケーションの `package.json` を参照してください。

## 🤝 貢献

このプロジェクトは個人開発プロジェクトですが、フィードバックや提案は大歓迎です。

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。  
詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 👤 作成者

**YUJI1027**
- GitHub: [@YUJI1027](https://github.com/YUJI1027)

---

**最終更新**: 2026年6月16日
