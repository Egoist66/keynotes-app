import { KeyNoteData } from '../use-key-notes/use-key-notes-types';

export type KeyNoteItemProps = {
    destroyAutoPlayByMouseEnter: (i: number) => void,
    stepIndex: number,
    itemIndex: number
    data: KeyNoteData[],
    bgColors: string[] | undefined
    title: string | undefined
}