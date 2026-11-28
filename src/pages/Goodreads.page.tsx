import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { Page } from '../components/Page.component';
import books from '../data/books.json';

export function Goodreads() {
    return (
        <Page title="Goodreads">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(auto-fill, minmax(200px, 1fr))',
                    },
                    gap: 2,
                }}
            >
                {books.map((book) => (
                    <Card key={book.link}>
                        <CardActionArea
                            href={book.link}
                            target="_blank"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'stretch',
                            }}
                        >
                            <CardMedia
                                component="img"
                                loading="lazy"
                                image={book.imageSrc}
                                alt={book.name}
                                sx={{
                                    aspectRatio: '2 / 3',
                                    objectFit: 'contain',
                                    p: 1.5,
                                }}
                            />
                            <CardContent>
                                <Typography variant="subtitle2">
                                    {book.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {book.author}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Page>
    );
}
