import React from "react";
import {KeyNoteData} from "../types/use-key-notes/use-key-notes-types.ts";

export type KeyNotesCSSProps = {
    data: KeyNoteData[] | undefined
    fontSize: string
    bgColors: string[] | undefined
    defaultBg: string | undefined
    controlsOut: boolean
    index: number
}

type CSS = React.CSSProperties

export const KeyNotesCSS = ({data, controlsOut, fontSize, index}: KeyNotesCSSProps) => {
    return {
        _keyNoteWrapperStyle: {
          display: "flex",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          color: data![index]?.textColor ? data![index]?.textColor : '#000',
          transition: "0.5s all ease",
          fontSize,
          backgroundColor: data![index]?.background ? data![index]?.background : '#fff',
          minHeight: "100vh",
          width: "100vw",
        } as CSS,
      
        _imageStyle: {
          position: "absolute",
          top: 0,
          transition: "0.3s all ease",
          left: 0,
          width: "100%",
          height: "100%",
        } as CSS,
      
        _controlsStyle: {
          border: "none",
          padding: 10,
          borderRadius: 5,
          fontSize: 18,
          boxShadow: "1px 1px 2px 1px #6f6f6f",
          cursor: "pointer",
        } as CSS,

        _keyNoteControls: {
            position: "absolute",
            transition: '0.3s all ease',
            right: 20,
            top: controlsOut ? '-700px' : 0,
            zIndex: 3,
            display: "flex",
            flexWrap: "wrap",
            alignItems: 'baseline',
            gap: 20,
            padding: 10,
        } as CSS,

        _sidePreviewStyle: {
            display: "flex",
        } as CSS
    } as const;
}
