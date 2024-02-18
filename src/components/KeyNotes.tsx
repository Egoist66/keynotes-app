import {
  FC,
  ReactNode,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/*

 Docs:



*/

type KeyNotesProps = {
  data?: Array<{ title?: string; content?: string; pictures?: string }>;
  textColor?: string;
  enableControls?: boolean;
  autoSlide?: {on?: boolean, speed?: number};
  position?: boolean;
  fontSize?: string;
  render?: (data?: {
    content: string | undefined;
    title: string | undefined;
    pics: string | undefined;
    order: number;
  }) => ReactNode;
  defaultBackground?: string;
  bgColors?: Array<string>;
};

type KeyNotesState = {
  order: number;
  index: number;
  position: boolean;
  isPicFull: boolean;
};

const KeyNotes: FC<KeyNotesProps> = memo(
  ({
    data,
    bgColors,
    defaultBackground,
    autoSlide = {on: false},
    position = false,
    render,
    enableControls = true,
    fontSize = "2rem",
    textColor = "#000",
  }) => {
    const [state, setState] = useState<KeyNotesState>({
      order: 1,
      index: 0,
      position: !position,
      isPicFull: false,
    });

    const KeyNoteRef = useRef<HTMLDivElement>(null);

    const keyNoteWrapperStyle: React.CSSProperties = useMemo(
      () => ({
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        color: textColor,
        transition: "0.5s all ease-in-out",
        fontSize,
        backgroundColor: bgColors ? bgColors[state.index] : defaultBackground,
        height: "100vh",
        width: "100vw",
      }),
      [state.index, state.order]
    );

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
        background-color: ${bgColors ? bgColors[state.index] : defaultBackground};
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        box-sizing: border-box;
        font-family: 'Arial';
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

    const slideByArrows = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        forward(1)();
      } else if (e.key === "ArrowLeft") {
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
      if (
        state.index >= (data?.length || 0) ||
        state.index >= (bgColors?.length || 0)
      ) {
        setState({
          ...state,
          order: 1,
          index: 0,
        });
      }

      return () => {};
    }, [state.index, data, bgColors]);

    useEffect(() => {
        let timer: any = null

        if(autoSlide.on){
            timer = setInterval(() => {
                forward(1)()
            }, autoSlide.speed ? autoSlide.speed * 1000 : 1000)
        }

        return () => {
            clearInterval(timer)
        }
    }, [autoSlide.on])

    useEffect(() => {
      document.documentElement.addEventListener("keydown", slideByArrows);

      return () => {
        document.documentElement.removeEventListener("keydown", slideByArrows);
      };
    });

    return (
      <>
        <div ref={KeyNoteRef} style={keyNoteWrapperStyle} id="keynote-wrapper">
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
                justifyContent: data && !data[state.index]?.pictures ? 'center': 'flex-start',
                alignItems: state.position ? 'initial': 'center',
                aspectRatio: "16/9",
                flexDirection: state.position ? "column" : "row",
                gap: 30,
              }}
              id="keynote-content"
            >
              <div style={{ width: !state.position ? "33.333%" : "100%" }} id="content">
                <h2>{data ? data[state.index]?.title : "Default title"}</h2>
                <p>{data ? data[state.index]?.content : "Default text"}</p>
              </div>

              {data && data[state.index]?.pictures ? <div id="pic">
                <img
                  style={state.isPicFull ? picStyle : { maxWidth: "100%" }}
                  src={data ? data[state.index]?.pictures : ""}
                  alt=""
                />
              </div>: null}
            </div>
          )}

          {enableControls ? (
            <div
              style={{
                position: "absolute",
                right: 20,
                top: 0,
                // bottom: 0,
                zIndex: 3,
                display: "flex",
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
              <button style={controlsStyles} onClick={() => setFullScreen()}>
                Full screen
              </button>

              <button style={controlsStyles} onClick={changePosition}>
                Change orientation
              </button>

              <button style={controlsStyles} onClick={setPicFullScreen}>
                Fullscreen pic
              </button>
              {state.order}
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                right: 20,
                top: 0,
                zIndex: 3,
                display: "flex",
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

        <style>{mainStyle}</style>
      </>
    );
  }
);

export default KeyNotes;
