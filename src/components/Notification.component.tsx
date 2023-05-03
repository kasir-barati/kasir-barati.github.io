import {
    Alert,
    Slide,
    Snackbar,
    SnackbarCloseReason,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { closeNotification } from '../redux/notification.slice';

export function Notification() {
    const { notification } = useAppSelector(
        (state) => state.notificationReducer,
    );
    const dispatch = useAppDispatch();
    const handleClose = (
        _event: Event | React.SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeNotification());
    };

    if (!notification) {
        return <></>;
    }

    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={notification.autoHideDuration}
            onClose={handleClose}
            TransitionComponent={TransitionLeftDirection}
        >
            <Alert
                onClose={handleClose}
                severity={notification.color}
                sx={{ width: '100%' }}
            >
                {notification.text}
            </Alert>
        </Snackbar>
    );
}

function TransitionLeftDirection(props: TransitionProps) {
    // FIXME: https://github.com/mui/material-ui/issues/36806
    // @ts-ignore
    return <Slide {...props} direction="left" />;
}
