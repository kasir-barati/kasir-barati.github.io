import { EntryList } from '../components/EntryList.component';
import { Page } from '../components/Page.component';
import flashcards from '../data/aws-flashcards.json';

export function AwsFlashcardsList() {
    return (
        <Page title="AWS Flashcards">
            <EntryList
                entries={flashcards}
                actionLabel="View flashcard"
            />
        </Page>
    );
}
