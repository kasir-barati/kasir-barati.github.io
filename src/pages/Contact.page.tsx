import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import { Box, Button, Stack } from '@mui/material';

export function Contact() {
    return (
        <Box height="100vh" bgcolor="rgba(34, 51, 51, 0.8)">
            <Stack
                direction="row"
                component="div"
                justifyContent="center"
                paddingTop={2}
                paddingBottom={2}
                spacing={2}
            >
                <Button
                    size="large"
                    variant="contained"
                    color="success"
                    href="https://www.linkedin.com/in/kasir-barati/"
                    target="_blank"
                >
                    <LinkedInIcon />
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    color="success"
                    href="https://github.com/kasir-barati/"
                    target="_blank"
                >
                    <GitHubIcon />
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="success"
                    href="mailto:kasir.barati@gmail.com"
                    target="_blank"
                >
                    <AlternateEmailIcon />
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    color="success"
                    href="https://www.reddit.com/user/m-jawad-b-khorasani"
                    target="_blank"
                >
                    <RedditIcon />
                </Button>
            </Stack>
        </Box>
    );
}
