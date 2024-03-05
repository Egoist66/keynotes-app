import { FC, ReactNode, memo, useEffect, useMemo, useRef, useState } from "react";
import { KeyNotesProps, KeyNotesState } from "../../hooks/useKeyNotes";


const KeyNotes: FC<KeyNotesProps> = memo(
  ({
    data,
    bgColors,
    defaultBackground,
    autoSlide = { on: false },
    position = false,
    render,
    enableControls = true,
    fontSize = "2rem",
    textColor = "#000",
  }) => {
    const [state, setState] = useState<KeyNotesState>({
      order: 1,
      index: 0,
      controlsOut: true,
      position: !position,
      autoSlide: {on: autoSlide.on, speed: autoSlide.speed},
      isPicFull: false,
    });

    const KeyNoteRef = useRef<HTMLDivElement>(null);
    let timer = useRef<any>(null)

    const keyNoteWrapperStyle: React.CSSProperties = useMemo(
      () => ({
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        color: textColor,
        transition: "0.5s all ease",
        fontSize,
        backgroundColor: bgColors ? bgColors[state.index] : defaultBackground,
        minHeight: "100vh",
        width: "100vw",
      }),
      [state.index, state.order]
    );

    const sidePreviewStyle: React.CSSProperties = {
      display: "flex",
    };

    const picStyle: React.CSSProperties = useMemo(
      () => ({
        position: "absolute",
        top: 0,
        transition: "0.3s all ease",
        left: 0,
        width: "100%",
        height: "100%",
      }),
      [state.isPicFull]
    );

    const mainStyle = `
    body,html {
        margin: 0;
        padding: 0;
        font-size: clamp(16px, 2vw, 18px);
        background-color: ${
          bgColors ? bgColors[state.index] : defaultBackground
        };
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        box-sizing: border-box;
        font-family: 'Arial';
    }

    body::after {
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      pointer-events: none;
      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: #888888 #f5f5f5;
    }
    
    ::-webkit-scrollbar {
      width: 10px;
      background: #e4e4e4
    }
    
  
    ::-webkit-scrollbar-thumb {
      background-color: #787878;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555555;
    }
    
    `;

    const controlsStyles: React.CSSProperties = useMemo(() => {
      return {
        border: "none",
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
        boxShadow: "1px 1px 2px 1px #6f6f6f",
        cursor: "pointer",
      };
    }, [state.order, state.index]);

    const forward = (count: number) => {
      return () => {
        setState((prevState) => ({
          ...prevState,
          order: prevState.order + count,
          index: prevState.index + count,
        }));
      };
    };

    const setControllsOut = (isOut: boolean) => {
      setState({
        ...state,
        controlsOut: isOut
      })
    }

    const slideByArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        forward(1)();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (state.index === 0) {
          return;
        }
        back(1)();
      }
    };

    const setPicFullScreen = () => {
      setState((prevState) => ({
        ...prevState,
        isPicFull: !prevState.isPicFull,
      }));
    };

    const back = (count: number) => {
      return () => {
        setState((prevState) => ({
          ...prevState,
          order: prevState.order - count,
          index: prevState.index - count,
        }));
      };
    };

    const autoForward = () => {
      timer!.current = setInterval(() => {
          forward(1)();
        },
        state.autoSlide?.speed ? state.autoSlide.speed * 1000 : 1000
      );
    }

    const autoPlay = () => {
      setState((prevState) => (
        {
          ...prevState,
          autoSlide: {...prevState.autoSlide, on: true}
        }
      ))
    }

    const setFullScreen = () => {
      if (KeyNoteRef.current) {
        KeyNoteRef.current.requestFullscreen();
      }
    };

    const changePosition = () => {
      setState((prevState) => ({
        ...prevState,
        position: !prevState.position,
      }));
    };

    useEffect(() => {
      if (state.index >= (data?.length || 0)) {
        setState({
          ...state,
          order: 1,
          index: 0,
        });
      }

      return () => {};
    }, [state.index, data, bgColors]);

    useEffect(() => {
 
      if (state.autoSlide?.on) {

        autoForward()
      }

      return () => {
        clearInterval(timer.current);
      };
    }, [state.autoSlide?.on]);

    useEffect(() => {
      document.documentElement.addEventListener("keydown", slideByArrows);

      return () => {
        document.documentElement.removeEventListener("keydown", slideByArrows);
      };
    });

    return (
      <>
        <div style={sidePreviewStyle} className="keynote-main">
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
            className="side-preview"
          >
            {data
              ? data.map((item, i: number) => (
                  <div
                    
                    onMouseEnter={() => {
                      clearTimeout(timer.current)
                      setState((prevState) => (
                        {
                          ...prevState,
                          index: i,
                          order: i + 1,
                          autoSlide: {...prevState.autoSlide, on: false}
                        }
                      ))
                    }}
                 
                    style={{
                      border:
                        state.index === i
                          ? "5px solid #4989dcf2"
                          : "1px solid #ccc",
                      borderBottom:
                        state.index === i ? "5px solid #4989dcf2" : 0,
                      borderLeft: state.index === i ? "5px solid #4989dcf2" : 0,
                      padding: 10,
                      backgroundImage: data && data[i]?.pictures ? `url(${data[i]?.pictures})` : '',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      height: "100%",
                      cursor: "pointer",
                      backgroundColor: bgColors ? bgColors[i] : "#eff6ff",
                      borderRight:
                        state.index === i ? "5px solid #4989dcf2" : 0,
                    }}
                    key={crypto.randomUUID()}
                  >
                    {item.title}
                  </div>
                ))
              : null}
          </div>

          <div
            onMouseEnter={() => setControllsOut(false)}
            onMouseLeave={() => setControllsOut(true)}
            ref={KeyNoteRef}
            style={keyNoteWrapperStyle}
            id="keynote-wrapper"
          >
            {render ? (
              render({
                content: data && data[state.index]?.content,
                title: data && data[state.index]?.title,
                order: state.order,
                pics: data && data[state.index]?.pictures,
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  padding: "2rem",
                  justifyContent:
                    data && !data[state.index]?.pictures
                      ? "center"
                      : "flex-start",
                  alignItems: state.position ? "initial" : "center",
                  aspectRatio: "16/9",
                  flexDirection: state.position ? "column" : "row",
                  gap: 30,
                }}
                id="keynote-content"
              >
                <div
                  style={{ width: !state.position ? "50%" : "100%" }}
                  id="content"
                >
                  {" "}
                  {data && data[state.index]?.pictures ? (
                    <div id="pic">
                      <img
                        style={
                          state.isPicFull ? picStyle : { maxWidth: "100%", width: 700, transition: "0.3s all ease",}
                        }
                        src={data ? data[state.index]?.pictures : ""}
                        alt=""
                      />
                    </div>
                  ) : null}
                  <h2>{data ? data[state.index]?.title : "Default title"}</h2>
                  <p>{data ? data[state.index]?.content : "Default text"}</p>
                </div>
              </div>
            )}

            {enableControls ? (
              <div
                style={{
                  position: "absolute",
                  transition: '0.3s all ease',
                  right: 20,
                  top: state.controlsOut ? '-700px': 0,
                  zIndex: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 20,
                  padding: 10,
                }}
                id="keynote-controls"
              >
                <button
                  style={controlsStyles}
                  disabled={state.index === 0}
                  onClick={back(1)}
                >
                  Back
                </button>
                <button style={controlsStyles} onClick={forward(1)}>
                  Forward
                </button>
                <button style={controlsStyles} onClick={autoPlay}>
                  Auto Play
                </button>
                <button style={controlsStyles} onClick={() => setFullScreen()}>
                  Full screen
                </button>

                <button style={controlsStyles} onClick={changePosition}>
                  Change orientation
                </button>

                <button
                  disabled={data && !data[state.index]?.pictures}
                  style={controlsStyles}
                  onClick={setPicFullScreen}
                >
                  Fullscreen pic
                </button>
                {state.order}
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  top: state.controlsOut ? '-700px': 0,
                  transition: '0.3s all ease',
                  zIndex: 3,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 20,
                  padding: 10,
                }}
                id="keynote-controls"
              >
                <button style={controlsStyles} onClick={changePosition}>
                  Change orientation
                </button>

                <button style={controlsStyles} onClick={setPicFullScreen}>
                  Fullscreen pic
                </button>
                {state.order}
              </div>
            )}
          </div>
        </div>

        <style>{mainStyle}</style>
      </>
    );
  }
);

export default KeyNotes;
