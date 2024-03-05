import { ReactNode, useEffect, useRef, useState } from "react";



export type KeyNotesProps = {
    data?: Array<{
      title?: string;
      content?: string;
      pictures?: string;
      id: number;
    }>;
    textColor?: string;
    enableControls?: boolean;
    autoSlide?: { on?: boolean; speed?: number };
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
  
export type KeyNotesState = {
    order: number;
    index: number;
    controlsOut: boolean;
    position: boolean;
    autoSlide?: { on?: boolean; speed?: number };
    isPicFull: boolean;
};
  

export const useKeyNotes = (data: [], bgColors: string[], position: boolean, on: boolean, speed: number) => {

    const [state, setState] = useState<KeyNotesState>({
        order: 1,
        index: 0,
        controlsOut: true,
        position: !position,
        autoSlide: {on, speed},
        isPicFull: false,
    });

    const KeyNoteRef = useRef<HTMLDivElement>(null);
    let timer = useRef<any>(null)


    
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
  
    
}