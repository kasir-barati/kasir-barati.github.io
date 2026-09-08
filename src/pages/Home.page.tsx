import { Avatar, Box, Typography } from '@mui/material';
import Typed from 'react-typed';
import avatarSrc from '../assets/me.jpg';
import { MyParticles } from '../components/MyParticles.component';
export function Home() {
    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            height={{ xs: 'auto', sm: '100%' }}
            sx={{ overflow: { xs: 'visible', sm: 'hidden' } }}
        >
            <MyParticles />
            <Box
                position="relative"
                zIndex={1}
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                flex={{ xs: '0 0 auto', sm: '1 1 auto' }}
                minHeight={0}
                width="100%"
                maxWidth="1200px"
                margin="0 auto"
                padding={{ xs: '32px 24px 48px', sm: '24px 24px' }}
                gap={{ xs: 3, sm: 3 }}
            >
                <Box
                    flex={{ xs: '0 0 auto', sm: '0 0 30%' }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    minHeight={0}
                    gap={2}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Avatar
                            src={avatarSrc}
                            alt="Kasir Barati"
                            sx={{ width: '130px', height: '130px' }}
                        ></Avatar>
                        <Typography
                            textTransform="uppercase"
                            variant="h3"
                            color="turquoise"
                        >
                            <Typed strings={['Kasir Barati']}></Typed>
                        </Typography>
                        <Typography variant="h4" fontWeight="900">
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
                            variant="h6"
                            fontWeight="300"
                            color="white"
                        >
                            Everything rises & falls on leadership.
                            John C. Maxwell
                        </Typography>
                    </Box>

                    <Box flex="0 0 auto" height={{ xs: 393, sm: 380 }}>
                        <iframe
                            src="https://player.rss.com/testing-llm-and-sharing-my-personal-experience-with-them?theme=color&v=2"
                            style={{
                                border: 'none',
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                borderRadius: '1rem',
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            scrolling="no"
                            title="Testing LLM and sharing my personal experience with them"
                        ></iframe>
                    </Box>
                </Box>

                <Box
                    flex={{ xs: '0 0 auto', sm: '1 1 70%' }}
                    minHeight={0}
                    height={{ xs: 500, sm: 'auto' }}
                >
                    <iframe
                        src={import.meta.env.VITE_TWIN_URL}
                        style={{
                            border: 'none',
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            borderRadius: '1rem',
                        }}
                        allow="clipboard-read; clipboard-write"
                        title="Kasir Barati's Digital Twin"
                    ></iframe>
                </Box>
            </Box>
        </Box>
    );
}
