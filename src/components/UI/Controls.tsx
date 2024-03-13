import {FC, memo} from "react";
import {ControlsPropsType} from "../../types/controls-buttons/controls-buttons.ts";


export const Controls: FC<ControlsPropsType> = memo(({options, style}) => {

    return (
        <>

            {options.map(option => (
                <button
                    disabled={option.disabled ?? false}
                    key={crypto.randomUUID()}
                    style={style}
                    onClick={option.onClickHandler}>
                    {option.name}
                </button>
            ))}


        </>
    )
})

