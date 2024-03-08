import {FC, ReactNode} from "react";

export const KeyNotePreview: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div
            style={{
                width: "15%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: "1px solid silver",
                minHeight: "100vh",
                overflow: "auto",
            }}
            className="key-note-preview"
        >
            {children}
        </div>

    )
}