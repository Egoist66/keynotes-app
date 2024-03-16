import {FC, memo} from "react";
import {useKeyNotes} from "../../hooks/useKeyNotes";
import {KeyNotesCSS} from "../../styles/key-notes-css";
import {MainStyle} from "../../styles/main-css";
import {KeyNotesProps} from "../../types/use-key-notes/use-key-notes-types.ts";
import {KeyNoteItem} from "../Common/KeyNoteItem.tsx";
import {KeyNotePreview} from "../Common/KeyNotePreview.tsx";
import {KeyNoteWrapper} from "../Common/KeyNoteWrapper.tsx";
import {Controls} from "../UI/Controls.tsx";
import {useUploadFile} from "../../hooks/useUpload.ts";


const KeyNotes: FC<KeyNotesProps> = memo(({
  data = undefined, bgColors,
  defaultBackground, autoSlide = {on: false},
  enableControls = true,
  fontSize = "2rem",

}) => {

    const {
        slides, input,
        message, upload, remove, triggerUpload

    } = useUploadFile()


    const {
            setControllsOut, autoPlay, setFullScreen,
            setPicFullScreen, destroyAutoPlayByMouseEnter, KeyNoteRef, state

        } = useKeyNotes((data ?? slides), bgColors, autoSlide.on, autoSlide.speed)


        const {
            _sidePreviewStyle, _controlsStyle, _keyNoteControls,
            _imageStyle, _keyNoteWrapperStyle

        } = KeyNotesCSS({
            bgColors,
            data: (data ?? slides),
            controlsOut: state.controlsOut,
            defaultBg: defaultBackground,
            fontSize,
            index: state.index
        })

        const mainStyle = MainStyle((data ?? slides), state.index, defaultBackground)

        const renderKeyNoteItem = () => {
            if (data && data.length > 1) {
                return data.map((item, i: number) => (

                    <KeyNoteItem
                        key={item.id}
                        destroyAutoPlayByMouseEnter={destroyAutoPlayByMouseEnter}
                        stepIndex={state.index}
                        itemIndex={i}
                        data={data}
                        title={item.title}
                    />

                ))

            } else {
                return slides.map((item, i: number) => (

                    <KeyNoteItem
                        key={item.id}
                        destroyAutoPlayByMouseEnter={destroyAutoPlayByMouseEnter}
                        stepIndex={state.index}
                        itemIndex={i}
                        data={slides}
                        title={item.title}
                    />

                ))
            }
        }

        return (
            <>
                <div style={_sidePreviewStyle} className="keynote-main">
                    <KeyNotePreview>
                        {renderKeyNoteItem()}
                    </KeyNotePreview>

                    <KeyNoteWrapper
                        setControllsOut={setControllsOut}
                        keyNoteRef={KeyNoteRef}
                        _keyNoteWrapperStyle={_keyNoteWrapperStyle}
                        data={data ?? slides}
                        stepIndex={state.index}
                        isPicFull={state.isPicFull}
                        _imageStyle={_imageStyle}
                    />


                    <div style={_keyNoteControls} id="keynote-controls">

                        {enableControls ? (
                            <Controls
                                style={_controlsStyle}
                                options={[
                                    {name: message || 'Upload slides', onClickHandler: triggerUpload},
                                    {name: 'Remove all', disabled: !slides.length ?? !data?.length,  onClickHandler: remove},
                                    // {name: 'Back', disabled: state.index === 0, onClickHandler: back(1)},
                                    // {name: 'Forward', disabled: !slides.length ?? !data?.length ,  onClickHandler: forward(1)},
                                    {name: 'Auto play', onClickHandler: autoPlay},
                                    {name: 'Fullscreen', onClickHandler: setFullScreen},
                                    {
                                        name: 'Fullscreen image',
                                        disabled: (!slides[state.index]?.pictures || !data![state.index]!.pictures),
                                        onClickHandler: setPicFullScreen
                                    },
                                ]}
                            />
                        ) : (
                            <Controls
                                style={_controlsStyle}
                                options={[
                                    {
                                        name: 'Fullscreen image',
                                        disabled: data && !data[state.index]?.pictures,
                                        onClickHandler: setPicFullScreen
                                    },
                                ]}
                            />
                        )}

                        <h3>{state.order}</h3>
                    </div>

                </div>

                <input
                    ref={input}
                    onChange={upload}
                    accept={'application/json'}
                    hidden
                    type="file"
                />
                
                <style>{mainStyle}</style>
                <div style={{position: "absolute", bottom: 10, right: 15}}>
                    <a target="_blank" style={{color: 'deepblue'}} title="download and upload into app" download href="/slides.json">Example slides</a>
                </div>
            </>
        );
    }
);

export default KeyNotes;

