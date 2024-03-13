import {KeyNoteData} from "../types/use-key-notes/use-key-notes-types.ts";

type CSSString = string;

export const MainStyle = (
  data: KeyNoteData[] | undefined,
  index: number,
  defaultBg: string | undefined
): CSSString => {
  return `
    body,html {
      margin: 0;
      padding: 0;
      font-size: clamp(16px, 2vw, 18px);
      background-color: ${data![index]?.background ? data![index]?.background : defaultBg};
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
};
