export interface Item {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info';
}