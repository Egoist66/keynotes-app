import {FC} from "react";
import {KeyNoteWrapperProps} from "../../types/key-note-wrapper/key-note-wrapper-types.ts";


export const KeyNoteWrapper: FC<KeyNoteWrapperProps> = (props) => {
    const {
        _keyNoteWrapperStyle,
        data,
        keyNoteRef,
        setControllsOut,
        isPicFull,
        _imageStyle,
        stepIndex
    } = props

    return (
        <div
            onMouseOver={() => setControllsOut(false)}
            ref={keyNoteRef}
            style={_keyNoteWrapperStyle}
            id="keynote-wrapper"
        >

            <div style={{
                display: "flex",
                padding: "2rem",
                justifyContent:
                    data && !data[stepIndex]?.pictures
                        ? "center"
                        : "flex-start",
                alignItems: "center",
                aspectRatio: "16/9",
                flexDirection: "row",
                gap: 30,
            }} id="keynote-content">
                <div
                    style={{width: "100%"}}
                    id="content"
                >

                    {data && data[stepIndex]?.pictures ? (
                        <div id="pic">
                            <img
                                style={
                                    isPicFull ? _imageStyle : {
                                        maxWidth: "100%",
                                        width: 700,
                                        transition: "0.3s all ease",
                                    }
                                }
                                src={data ? data[stepIndex]?.pictures : ""}
                                alt=""
                            />
                        </div>
                    ) : null}
                    <h2>{data ? data[stepIndex]?.title : "Default title"}</h2>
                    <p>{data ? data[stepIndex]?.content : "Default text"}</p>
                </div>
            </div>

        </div>
    )
}
