import {
    Box,
    InputAdornment,
    SxProps,
    TextField,
    Theme,
} from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBoxProps {
    sx?: SxProps<Theme>;
    onSearch?: () => void;
}

export function SearchBox({ sx, onSearch }: SearchBoxProps) {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        navigate(`/posts?q=${encodeURIComponent(searchText.trim())}`);
        onSearch?.();
    };

    return (
        <Box
            component="form"
            role="search"
            onSubmit={handleSubmit}
            sx={sx}
        >
            <TextField
                type="search"
                size="small"
                fullWidth
                placeholder="Search posts"
                value={searchText}
                onChange={(
                    event: ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => setSearchText(event.target.value)}
                inputProps={{ 'aria-label': 'Search posts' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon size={18} />
                        </InputAdornment>
                    ),
                    sx: { borderRadius: 99 },
                }}
            />
        </Box>
    );
}
