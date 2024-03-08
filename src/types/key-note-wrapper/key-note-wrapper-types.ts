import {KeyNoteData} from "../use-key-notes/use-key-notes-types.ts";
import React from "react";

export type KeyNoteWrapperProps = {
    setControllsOut: (mode: boolean) => void
    keyNoteRef: React.RefObject<HTMLDivElement>
    _keyNoteWrapperStyle: React.CSSProperties
    data: KeyNoteData[] | undefined,
    stepIndex: number
    isPicFull: boolean
    _imageStyle: React.CSSProperties


}