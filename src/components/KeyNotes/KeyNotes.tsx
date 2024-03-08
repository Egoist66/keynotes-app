import {FC, memo} from "react";
import {useKeyNotes} from "../../hooks/useKeyNotes";
import {KeyNotesCSS} from "../../styles/key-notes-css";
import {MainStyle} from "../../styles/main-css";
import {KeyNotesProps} from "../../types/use-key-notes/use-key-notes-types.ts";
import {KeyNoteItem} from "../Common/KeyNoteItem.tsx";
import {KeyNotePreview} from "../Common/KeyNotePreview.tsx";
import {KeyNoteWrapper} from "../Common/KeyNoteWrapper.tsx";


const KeyNotes: FC<KeyNotesProps> = memo(({
  data, bgColors, defaultBackground, autoSlide = {on: false},
  enableControls = true,
  fontSize = "2rem",
  textColor = "#000",
}) => {

        const {
            setControllsOut,
            autoPlay,
            back,
            forward,
            setFullScreen,
            setPicFullScreen,
            destroyAutoPlayByMouseEnter,
            KeyNoteRef,
            state

        } = useKeyNotes(data, bgColors, autoSlide.on, autoSlide.speed)


        const {
            _sidePreviewStyle,
            _controlsStyle,
            _imageStyle,
            _keyNoteWrapperStyle

        } = KeyNotesCSS({bgColors, defaultBg: defaultBackground, fontSize, textColor, index: state.index})

        const mainStyle = MainStyle(bgColors, state.index, defaultBackground)


        return (
            <>
                <div style={_sidePreviewStyle} className="keynote-main">
                    <KeyNotePreview>
                        {data ? data.map((item, i: number) => (
                            <KeyNoteItem
                                key={item.id}
                                destroyAutoPlayByMouseEnter={destroyAutoPlayByMouseEnter}
                                stepIndex={state.index}
                                itemIndex={i}
                                data={data}
                                bgColors={bgColors}
                                title={item.title}
                            />
                        )) : null}
                    </KeyNotePreview>

                        <KeyNoteWrapper
                                setControllsOut={setControllsOut}
                                keyNoteRef={KeyNoteRef}
                                _keyNoteWrapperStyle={_keyNoteWrapperStyle}
                                data={data}
                                stepIndex={state.index}
                                isPicFull={state.isPicFull}
                                _imageStyle={_imageStyle}
                        />


                        {enableControls ? (
                            <div
                                style={{
                                    position: "absolute",
                                    transition: '0.3s all ease',
                                    right: 20,
                                    top: state.controlsOut ? '-700px' : 0,
                                    zIndex: 3,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: 'baseline',
                                    gap: 20,
                                    padding: 10,
                                }}
                                id="keynote-controls"
                            >
                                <button
                                    style={_controlsStyle}
                                    disabled={state.index === 0}
                                    onClick={back(1)}
                                >
                                    Back
                                </button>
                                <button style={_controlsStyle} onClick={forward(1)}>
                                    Forward
                                </button>
                                <button style={_controlsStyle} onClick={autoPlay}>
                                    Auto Play
                                </button>
                                <button style={_controlsStyle} onClick={() => setFullScreen()}>
                                    Full screen
                                </button>

                                <button
                                    disabled={data && !data[state.index]?.pictures}
                                    style={_controlsStyle}
                                    onClick={setPicFullScreen}
                                >
                                    Fullscreen pic
                                </button>
                                <h3>{state.order}</h3>
                            </div>
                        ) : (
                            <div
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    top: state.controlsOut ? '-700px' : 0,
                                    transition: '0.3s all ease',
                                    zIndex: 3,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 20,
                                    alignItems: 'baseline',
                                    padding: 10,
                                }}
                                id="keynote-controls"
                            >

                                <button style={_controlsStyle} onClick={setPicFullScreen}>
                                    Fullscreen pic
                                </button>
                                <h3>{state.order}</h3>
                            </div>
                        )}
                    </div>

                <style>{mainStyle}</style>
            </>
        );
    }
);

export default KeyNotes;
