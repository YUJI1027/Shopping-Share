# vue-schedule-app

このプロジェクトは、Vue.jsを使用して構築されたスケジュール管理アプリケーションです。ユーザーはイベントを管理し、グループと連携してスケジュールを共有できます。

## 構成ファイル

- **src/main.ts**: アプリケーションのエントリーポイント。Vueインスタンスを初期化し、ルーターとストアを設定します。
- **src/App.vue**: アプリケーションのルートコンポーネント。全体のレイアウトと構造を含みます。
- **src/router/index.ts**: ルーティング設定を定義し、ルートとそれに対応するコンポーネントを指定します。
- **src/store/index.ts**: Vuexストアを設定し、状態、ミューテーション、アクション、ゲッターを定義します。
- **src/layouts/DefaultLayout.vue**: アプリケーションのデフォルトレイアウトを定義し、共通要素（ヘッダーやサイドバー）を含みます。
- **src/views/Home.vue**: アプリケーションのホームビュー。ユーザーのメインコンテンツを表示します。
- **src/views/CalendarView.vue**: カレンダービュー。ユーザーがイベントを確認・管理できる場所です。
- **src/views/Settings.vue**: ユーザーがアプリケーションの設定を調整できるビューです。
- **src/components/Header.vue**: アプリのタイトルやナビゲーションリンクを含むヘッダーコンポーネント。
- **src/components/Sidebar.vue**: ユーザーのナビゲーションオプションを提供するサイドバーコンポーネント。
- **src/components/TopBar.vue**: 追加のナビゲーションやアクションボタンを含むトップバーコンポーネント。
- **src/components/GroupList.vue**: ユーザーグループのリストを表示します。
- **src/components/GroupCard.vue**: 特定のグループの詳細を表示するグループカード。
- **src/components/EventCard.vue**: イベントの詳細を表示するイベントカード。
- **src/components/AddEventModal.vue**: 新しいイベントを追加するためのモーダル。
- **src/components/LoadingOverlay.vue**: データを取得中に表示されるローディングオーバーレイ。
- **src/composables/useAuth.ts**: ユーザー認証を処理するためのコンポーザブル関数。
- **src/composables/useGroups.ts**: ユーザーグループを管理するためのコンポーザブル関数。
- **src/assets/styles/variables.css**: UIのブルー基調のカラーパレットを定義します。
- **src/assets/styles/base.css**: リセットスタイルとタイポグラフィ設定を含みます。
- **src/assets/styles/responsive.css**: レスポンシブデザインとモバイル調整のためのメディアクエリを含みます。
- **src/utils/formatDate.ts**: 日付をフォーマットするためのユーティリティ関数をエクスポートします。
- **src/types/index.ts**: アプリケーション全体で使用されるTypeScriptの型とインターフェースを定義します。
- **public/index.html**: ウェブアプリケーションのエントリーポイントとなるメインHTMLファイル。
- **package.json**: プロジェクトのメタデータ、依存関係、ビルドおよび実行スクリプトを含みます。
- **vite.config.ts**: プロジェクトで使用されるビルドツールViteの設定ファイル。
- **tsconfig.json**: TypeScriptの設定ファイル。コンパイラオプションとファイルのインクルードを指定します。

## セットアップ

1. リポジトリをクローンします。
2. 依存関係をインストールします。
   ```
   npm install
   ```
3. 開発サーバーを起動します。
   ```
   npm run dev
   ```

## 使用方法

アプリケーションにアクセスするには、ブラウザで `http://localhost:3000` を開いてください。ユーザーはイベントを追加、編集、削除し、グループとスケジュールを共有できます。