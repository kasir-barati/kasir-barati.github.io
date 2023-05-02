import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from '@mui/material';
import books from '../data/books.json';

export function Book() {
    return (
        <Box
            component="div"
            padding={2}
            bgcolor="rgba(34, 51, 51, 0.8)"
        >
            <ImageList gap={70} cols={3}>
                {books.map((book, index) => (
                    <ImageListItem key={index}>
                        <img
                            loading="lazy"
                            alt={book.name}
                            src={book.imageSrc}
                        />
                        <ImageListItemBar
                            title={book.name}
                            subtitle={book.author}
                            actionIcon={
                                <IconButton
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.54)',
                                    }}
                                    aria-label={`info about ${book.name}`}
                                    href={book.link}
                                    target="_blank"
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
