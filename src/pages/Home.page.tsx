import { Avatar, Box, Grid, Typography } from '@mui/material';
import Typed from 'react-typed';
import avatarSrc from '../assets/me.jpg';
import { MyParticles } from '../components/MyParticles.component';
export function Home() {
    return (
        <>
            <Box
                position="absolute"
                top="50%"
                left="50%"
                width="100vw"
                textAlign="center"
                zIndex={1}
                sx={{
                    transform: 'translate(-50%,-50%)',
                }}
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
                            'DevOps Engineer',
                            'Security Engineer',
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
            <MyParticles />
        </>
    );
}
