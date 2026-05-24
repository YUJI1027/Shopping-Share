// src/types/index.ts

// ユーザー情報の型
export interface User {
    id: string;
    name: string;
    email: string;
}

// グループ情報の型
export interface Group {
    id: string;
    name: string;
    members: User[];
}

// イベント情報の型
export interface Event {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    groupId: string;
}

// アプリケーションの状態の型
export interface AppState {
    user: User | null;
    userGroups: Group[];
    events: Event[];
    isLoading: boolean;
}