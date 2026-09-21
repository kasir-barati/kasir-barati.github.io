import { Masonry } from '@mui/lab';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import posts from '../data/posts.json';
import flashcards from '../data/aws-flashcards.json';
import { searchPosts } from '../utils/postsSearch';
import { getRandomColor } from '../utils/genRandomColor';
import { CopyToClipboardButton } from '../components/CopyToClipboardButton.component';

export function PostList() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        let isCurrent = true;
        setIsSearching(true);

        const searchTargets = query.trim()
            ? [...posts, ...flashcards]
            : posts;

        searchPosts(searchTargets, query).then((results) => {
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
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {filteredPosts.map((post) => (
                    <Card key={post.id}>
                        <CardContent>
                            <Typography
                                color={getRandomColor()}
                                variant="h5"
                                gutterBottom
                            >
                                {post.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                textAlign="justify"
                                mt={1}
                                mb={2}
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
                                            post.tags.length - 1 &&
                                            ' . '}
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
                            <CopyToClipboardButton
                                variant="contained"
                                color="primary"
                                url={post.href}
                            >
                                Share
                            </CopyToClipboardButton>
                        </CardActions>
                    </Card>
                ))}
            </Masonry>
        </Box>
    );
}
