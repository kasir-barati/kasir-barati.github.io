import {
    Avatar,
    Box,
    Paper,
    Theme,
    Typography,
    useTheme,
} from '@mui/material';
import Typed from 'react-typed';
import avatarSrc from '../assets/me.jpg';
import { MyParticles } from '../components/MyParticles.component';
import { SocialLinks } from '../components/SocialLinks.component';

const frameStyle = {
    border: 'none',
    width: '100%',
    height: '100%',
    display: 'block',
    // A mismatching color scheme paints the iframe background white
    colorScheme: 'normal',
};

export function Home() {
    const { palette } = useTheme();

    return (
        <>
            <MyParticles />
            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: 'minmax(0, 1fr)',
                    md: '400px minmax(0, 1fr)',
                }}
                gap={2}
                minHeight={{ md: '100%' }}
                margin="0 auto"
                padding={{ xs: 2, md: 3 }}
                sx={{
                    maxWidth: (theme: Theme) =>
                        theme.breakpoints.values.lg,
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    sx={{ height: 'fit-content' }}
                >
                    <Paper
                        variant="outlined"
                        sx={{
                            px: 3,
                            py: 2,
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Avatar
                            src={avatarSrc}
                            alt="Kasir Barati"
                            sx={{
                                width: 96,
                                height: 96,
                                mx: 'auto',
                                mb: 2,
                                border: 3,
                                borderColor: 'primary.main',
                            }}
                        />
                        <Typography
                            variant="h1"
                            color="primary"
                            textTransform="uppercase"
                        >
                            <Typed strings={['Kasir Barati']}></Typed>
                        </Typography>
                        <Typography variant="h2" component="p" my={1}>
                            <Typed
                                strings={[
                                    'Fullstack Engineer',
                                    'Backend Engineer',
                                ]}
                                typeSpeed={37}
                                backSpeed={47}
                                loop={true}
                            ></Typed>
                        </Typography>
                        <Typography
                            color="text.secondary"
                            mb={2}
                            sx={{ textWrap: 'balance' }}
                        >
                            Everything rises & falls on leadership.
                            John C. Maxwell
                        </Typography>
                        <SocialLinks />
                    </Paper>
                    <Box height={{ xs: 393, md: 330 }}>
                        <iframe
                            src={`https://player.rss.com/testing-llm-and-sharing-my-personal-experience-with-them?theme=${palette.mode}&v=2`}
                            style={frameStyle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            scrolling="no"
                            title="Testing LLM and sharing my personal experience with them"
                        ></iframe>
                    </Box>
                </Box>
                <Paper
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        height: { xs: 500, md: 'auto' },
                        overflow: 'hidden',
                    }}
                >
                    <iframe
                        src={import.meta.env.VITE_TWIN_URL}
                        style={frameStyle}
                        allow="clipboard-read; clipboard-write"
                        title="Kasir Barati's Digital Twin"
                    ></iframe>
                </Paper>
            </Box>
        </>
    );
}
