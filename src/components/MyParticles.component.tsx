import { useTheme } from '@mui/material';
import ParticlesBg from 'particles-bg';

export function MyParticles() {
    const { palette } = useTheme();

    return (
        <ParticlesBg
            key={palette.mode}
            type="cobweb"
            color={palette.primary.main}
            num={50}
            bg={true}
        />
    );
}
