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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import posts from '../data/posts.json';
import { searchPosts } from '../utils/postsSearch';

export function PostList() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        let isCurrent = true;
        setIsSearching(true);

        searchPosts(posts, query).then((results) => {
            if (isCurrent) {
                setFilteredPosts(results);
                setIsSearching(false);
            }
        });

        return () => {
            isCurrent = false;
        };
    }, [query]);

    if (isSearching) {
        return (
            <Box padding={2}>
                <Typography>Searching...</Typography>
            </Box>
        );
    }

    if (query && filteredPosts.length === 0) {
        return (
            <Box padding={2}>
                <Typography>
                    No posts found for &quot;{query}&quot;
                </Typography>
            </Box>
        );
    }

    return (
        <Box padding={2}>
            <Grid container justifyItems="center" spacing={2}>
                {filteredPosts.map((post) => (
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
