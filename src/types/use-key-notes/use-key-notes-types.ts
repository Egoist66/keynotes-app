
export type KeyNoteData = {
  title?: string;
  content?: string;
  pictures?: string;
  id: number;
};

export type KeyNotesProps = {
  data?: Array<KeyNoteData>;
  textColor?: string;
  enableControls?: boolean;
  autoSlide?: { on?: boolean; speed?: number };
  position?: boolean;
  fontSize?: string;
  defaultBackground?: string;
  bgColors?: Array<string>;
};

export type KeyNotesState = {
  order: number;
  index: number;
  controlsOut: boolean;
  autoSlide?: { on?: boolean; speed?: number };
  isPicFull: boolean;
};

export type useKeyNotesProps = {
  data: KeyNoteData[] | undefined;
  bgColor: string[] | undefined;
  position: boolean;
  on: boolean | undefined;
  speed: number | undefined;
};
