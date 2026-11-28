import { EntryList } from '../components/EntryList.component';
import { Page } from '../components/Page.component';
import flashcards from '../data/react-flashcards.json';

export function ReactFlashcardsList() {
    return (
        <Page title="React Flashcards">
            <EntryList
                entries={flashcards}
                actionLabel="View flashcard"
            />
        </Page>
    );
}
