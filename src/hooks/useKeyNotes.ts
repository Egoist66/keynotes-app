import {useCallback, useEffect, useRef, useState} from "react";
import {KeyNoteData, KeyNotesState} from "../types/use-key-notes/use-key-notes-types.ts";

export const useKeyNotes = (
  data: KeyNoteData[] | undefined,
  //@ts-ignore
  bgColors: string[] | undefined,
  on: boolean | undefined,
  speed: number | undefined
) => {


  const [state, setState] = useState<KeyNotesState>({
    order: 1,
    index: 0,
    controlsOut: true,
    autoSlide: { on, speed },
    isPicFull: false,
  });


  const KeyNoteRef = useRef<HTMLDivElement>(null);
  let timer = useRef<any>(null);

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
      controlsOut: isOut,
    });
  };

  const slideByArrows = (e: KeyboardEvent) => {
    

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      forward(1)();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      if (state.index === 0 || state.order === 1) {
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
    timer!.current = setInterval(
      () => {
        forward(1)();
      },
      state.autoSlide?.speed ? state.autoSlide.speed * 1000 : 1000
    );
  };

  const autoPlay = () => {
    setState((prevState) => ({
      ...prevState,
      autoSlide: { ...prevState.autoSlide, on: true },
    }));
  };

  const setFullScreen = () => {
    if (KeyNoteRef.current) {
      KeyNoteRef.current.requestFullscreen();
    }
  };



  const destroyAutoPlayByMouseEnter = useCallback((i: number) => {
    clearTimeout(timer.current)
    setState((prevState) => (
      {
        ...prevState,
        index: i,
        order: i + 1,
        autoSlide: {...prevState.autoSlide, on: false}
      }
    ))
  }, [])

  useEffect(() => {
    if (state.order > data!.length) {
      setState((prevState) => (
        {
          ...prevState,
          order: 1,
          index: 0,
        }
      ));
    }

    return () => {};
  }, [state.order, data?.length, bgColors]);

  useEffect(() => {
    if (state.autoSlide?.on) {
      autoForward();
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

  

  return {
    destroyAutoPlayByMouseEnter,
    setFullScreen,
    back,
    forward,
    setControllsOut,
    setPicFullScreen,
    setState,
    slideByArrows,
    autoForward,
    timer,
    KeyNoteRef,
    autoPlay,
    state
  }
};
