import { EntryList } from '../components/EntryList.component';
import { Page } from '../components/Page.component';
import flashcards from '../data/golang-flashcards.json';

export function GolangFlashcardsList() {
    return (
        <Page title="Golang Flashcards">
            <EntryList
                entries={flashcards}
                actionLabel="View flashcard"
            />
        </Page>
    );
}
