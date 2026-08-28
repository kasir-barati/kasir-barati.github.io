import { Avatar, Box, Grid, Typography } from '@mui/material';
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
                flexShrink={0}
                textAlign="center"
                paddingTop={{ xs: 4, sm: 5 }}
                paddingX={2}
            >
                <Grid container justifyContent="center">
                    <Avatar
                        src={avatarSrc}
                        alt="Kasir Barati"
                        sx={{ width: '130px', height: '130px' }}
                    ></Avatar>
                </Grid>
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
                    Everything rises & falls on leadership. John C.
                    Maxwell
                </Typography>
            </Box>

            <Box
                position="relative"
                zIndex={1}
                display="flex"
                flexDirection="column"
                flex={{ xs: '0 0 auto', sm: '1 1 auto' }}
                minHeight={0}
                width="100%"
                maxWidth="900px"
                margin="0 auto"
                padding={{ xs: '16px 24px 48px', sm: '8px 24px 24px' }}
            >
                <Box
                    flex={{ xs: '0 0 auto', sm: '1 1 auto' }}
                    minHeight={0}
                    height={{ xs: 700, sm: 'auto' }}
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
