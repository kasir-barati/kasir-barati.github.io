import { Search as SearchIcon } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    InputBase,
    Paper,
    SxProps,
    Theme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBoxProps {
    sx?: SxProps<Theme>;
    onSearch?: () => void;
}

export function SearchBox({ sx, onSearch }: SearchBoxProps) {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(
            `/posts?q=${encodeURIComponent(searchText.trim())}`,
        );
        onSearch?.();
    };

    const handleKeyUp = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Paper
            sx={{
                padding: 1,
                display: 'flex',
                border: 1,
                borderColor: 'primary.main',
                alignItems: 'center',
                marginY: 1,
                ...sx,
            }}
        >
            <InputBase
                placeholder="Search"
                value={searchText}
                onChange={(event) =>
                    setSearchText(event.currentTarget.value)
                }
                onKeyUp={handleKeyUp}
            />
            <Divider
                flexItem
                orientation="vertical"
                sx={{
                    borderColor: 'secondary.main',
                    marginX: 1,
                }}
            />
            <IconButton type="button" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
