import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import posts from '../data/posts.json';

export function PostList() {
    return (
        <Box padding={2}>
            <Grid container justifyItems="center" spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height={130}
                                image={'./black.jpg'}
                                alt={''}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="secondary.main"
                                >
                                    {post.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="success"
                                    href={post.href}
                                >
                                    Read more
                                </Button>
                                {/* <CopyToClipboardButton
                                    variant="contained"
                                    color="primary"
                                >
                                    Share
                                </CopyToClipboardButton> */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
