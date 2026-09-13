import { Button, ButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useAppDispatch } from '../hooks/redux.hook';
import { showNotification } from '../redux/notification.slice';

export function CopyToClipboardButton({
    children,
    url,
    ...props
}: PropsWithChildren<Omit<ButtonProps, 'onClick'> & { url: string }>) {
    const handleClick = () => {
        navigator.clipboard.writeText(
            new URL(url, window.location.href).toString(),
        );
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
