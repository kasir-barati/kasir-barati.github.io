import { configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from './notification.slice';
import { themeReducer } from './theme.slice';

export const store = configureStore({
    reducer: { themeReducer, notificationReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
