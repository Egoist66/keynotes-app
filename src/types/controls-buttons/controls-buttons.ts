type ControlOptionsType = {
    name: string,
    disabled?: boolean,
    onClickHandler: () => void
}

export type ControlsPropsType = {
    style: React.CSSProperties,
    options: Array<ControlOptionsType>
}