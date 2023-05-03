import { AlertColor } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type NotificationState = {
    text: string;
    color: AlertColor;
    open?: boolean;
    autoHideDuration?: number;
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: {} as NotificationState | null,
    },
    reducers: {
        showNotification: (
            state,
            { payload }: PayloadAction<NotificationState>,
        ) => {
            const {
                autoHideDuration = 6000,
                open = true,
                ...rest
            } = payload;

            state.notification = {
                autoHideDuration,
                open,
                ...rest,
            };
        },
        closeNotification: (state) => {
            state.notification = null;
        },
    },
});
export const { closeNotification, showNotification } =
    notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
