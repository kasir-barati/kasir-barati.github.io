import { Button, ButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useAppDispatch } from '../hooks/redux.hook';
import { showNotification } from '../redux/notification.slice';

export function CopyToClipboardButton({
    children,
    ...props
}: PropsWithChildren<Omit<ButtonProps, 'onClick'>>) {
    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href);
        dispatch(
            showNotification({
                color: 'success',
                text: 'URL copied to clipboard',
            }),
        );
    };
    const dispatch = useAppDispatch();

    return (
        <Button {...props} onClick={handleClick}>
            {children}
        </Button>
    );
}
