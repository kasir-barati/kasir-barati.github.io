import Particles from 'react-particles';

export function MyParticles() {
    return (
        <Particles
            params={{
                particles: {
                    number: {
                        value: 45,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 1,
                            color: 'cyan',
                        },
                    },
                    size: {
                        value: 8,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 6,
                            size_min: 0,
                            sync: true,
                        },
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                },
            }}
        />
    );
}
