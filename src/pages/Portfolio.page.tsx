import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import projects from '../data/projects.json';

export function Portfolio() {
    return (
        <Box
            component="div"
            bgcolor="rgba(34, 51, 51, 0.8)"
            height="100%"
        >
            <Grid container justifyContent="center">
                {projects.map((project) => {
                    return (
                        <Card
                            sx={{
                                maxWidth: 345,
                                margin: '3rem auto',
                            }}
                            key={project.imageSrc}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={project.alt}
                                    height="140"
                                    image={project.imageSrc}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        gutterBottom={true}
                                    >
                                        {project.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="GrayText"
                                    >
                                        {project.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {project.links.map((link) => (
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        target="_blank"
                                        href={link.address}
                                        key={link.address}
                                    >
                                        {link.buttonName}
                                    </Button>
                                ))}
                            </CardActions>
                        </Card>
                    );
                })}
            </Grid>
        </Box>
    );
}
