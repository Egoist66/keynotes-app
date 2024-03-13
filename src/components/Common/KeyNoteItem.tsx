import {FC, memo} from "react";
import {KeyNoteItemProps} from "../../types/key-note-item/key-note-types.ts";


export const KeyNoteItem: FC<KeyNoteItemProps> = memo(({
       data, title,
       destroyAutoPlayByMouseEnter,
       stepIndex,
       itemIndex
   }) => {
    return (
        <div
            className="key-note-item"
            onMouseEnter={() => destroyAutoPlayByMouseEnter(itemIndex)}
            style={{
                border: stepIndex === itemIndex ? "5px solid #4989dcf2" : "1px solid #ccc",
                borderBottom: stepIndex === itemIndex ? "5px solid #4989dcf2" : 0,
                padding: 10,
                color: data![itemIndex]?.textColor ? data![itemIndex]?.textColor : '#000',
                backgroundImage:
                    data && data[itemIndex]?.pictures ? `url(${data[itemIndex]?.pictures})` : "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
                cursor: "pointer",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: data![itemIndex]?.background ? data![itemIndex]?.background : "#eff6ff",
            }}
            key={crypto.randomUUID()}
        >
            {title}
        </div>
    );
})
