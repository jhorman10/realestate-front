import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalType: string | null;
  notifications: Notification[];
  viewMode: 'grid' | 'list';
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timeout?: number;
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  modalOpen: false,
  modalType: null,
  notifications: [],
  viewMode: 'grid',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
      if (!action.payload) {
        state.modalType = null;
      }
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modalOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setSidebarOpen,
  toggleSidebar,
  setModalOpen,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setViewMode,
  toggleViewMode,
} = uiSlice.actions;

export default uiSlice.reducer;
