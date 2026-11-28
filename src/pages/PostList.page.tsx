import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { EntryList } from '../components/EntryList.component';
import { Page } from '../components/Page.component';
import awsFlashcards from '../data/aws-flashcards.json';
import golangFlashcards from '../data/golang-flashcards.json';
import posts from '../data/posts.json';
import reactFlashcards from '../data/react-flashcards.json';
import { searchPosts } from '../utils/postsSearch';

export function PostList() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        let isCurrent = true;
        setIsSearching(true);

        const searchTargets = query.trim()
            ? [
                  ...posts,
                  ...awsFlashcards,
                  ...golangFlashcards,
                  ...reactFlashcards,
              ]
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

    return <Page title="My Posts">{renderResults()}</Page>;

    function renderResults() {
        if (isSearching) {
            return <Typography>Searching...</Typography>;
        }

        if (query && filteredPosts.length === 0) {
            return (
                <Typography>
                    No posts found for &quot;{query}&quot;
                </Typography>
            );
        }

        return (
            <EntryList
                entries={filteredPosts}
                actionLabel="Read more"
            />
        );
    }
}
