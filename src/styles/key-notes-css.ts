import React from "react";

export type KeyNotesCSSProps = {
    textColor: string,
    fontSize: string
    bgColors: string[] | undefined
    defaultBg: string | undefined
    index: number
}

type CSS = React.CSSProperties

export const KeyNotesCSS = ({bgColors, defaultBg, fontSize, index, textColor}: KeyNotesCSSProps) => {
    return {
        _keyNoteWrapperStyle: {
          display: "flex",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          color: textColor,
          transition: "0.5s all ease",
          fontSize,
          backgroundColor: bgColors ? bgColors[index] : defaultBg,
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

        _sidePreviewStyle: {
            display: "flex",
        } as CSS
    } as const;
}
