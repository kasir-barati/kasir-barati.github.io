import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';
import posts from '../data/posts.json';

export function PostList() {
    return (
        <Box padding={2}>
            <Grid container justifyItems="center" spacing={2}>
                {posts.map((post) => (
                    <Grid key={post.id} item xs={12} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height={130}
                                image={post.imageSrc}
                                alt={''}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {post.description}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    color="white"
                                >
                                    {post.tags.map((tag, index) => (
                                        <>
                                            {tag}{' '}
                                            {index !==
                                                post.tags.length -
                                                    1 && ' . '}
                                        </>
                                    ))}
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
