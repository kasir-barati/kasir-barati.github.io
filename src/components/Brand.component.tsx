import { Avatar, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function Brand() {
    return (
        <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="text.primary"
            display="flex"
            alignItems="center"
            gap={1.5}
        >
            <Avatar
                src="/logo.png"
                alt=""
                sx={{ width: 36, height: 36 }}
            />
            <Typography variant="h3" component="span" noWrap>
                Kasir Barati
            </Typography>
        </Link>
    );
}
