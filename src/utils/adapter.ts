import {KeyNoteData} from "../types/use-key-notes/use-key-notes-types.ts";

export function adapter<T = any>(data: string | ArrayBuffer | null | Array<KeyNoteData>){
    return JSON.parse(<string>data) as T
}
