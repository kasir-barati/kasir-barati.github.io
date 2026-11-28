import { Container, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export function Page({
    title,
    children,
}: PropsWithChildren<{ title: string }>) {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            <Typography
                variant="h1"
                sx={{
                    'mb': 4,
                    '&::after': {
                        content: '""',
                        display: 'block',
                        width: 48,
                        height: 4,
                        mt: 1,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                    },
                }}
            >
                {title}
            </Typography>
            {children}
        </Container>
    );
}
