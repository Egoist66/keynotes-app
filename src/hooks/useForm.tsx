import {ChangeEvent, FC, useEffect} from "react";
import {useState} from "react";

type useInputStateType = {
    [key: string]: string
}

type requiredFieldsOptionType = {
    minLength: number
    maxLength: number,

}

type useInputProps = {
    name: string
}

type WatchFieldsType = {
    values: string[]
    callbacks: Array<() => void>

}


export const useForm = ({name}: useInputProps, options: requiredFieldsOptionType) => {

    const [isFormDisabled, setDisabled] = useState<boolean>(true)
    const [isDirty, setDirty] = useState<boolean>(false)
    const [errorFieldsMessage, setErrorFields] = useState<string | null>(null)

    const [state, setState] = useState<useInputStateType>({
        [name]: ''
    })

    const OnChangeBlurDirty = () => {
        setDirty(true)
    }

    const OnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            [name]: e.currentTarget.value
        });

    }

    const requireField = () => {
        if(!state[name].length){
            setDisabled(true)
            setErrorFields('Empty fields are not allowed!')
        }
        else if(state[name].length < options.minLength){
            setDisabled(true)
            setErrorFields(`Min ${options.minLength} required!`)
        }
        else if(state[name].length > options.maxLength){
            setDisabled(true)
            setErrorFields(`Max ${options.maxLength} allowed!`)
        }
        else {
            setDisabled(false)
            setErrorFields(null)
        }
    }

    const WatchFields: FC<WatchFieldsType> = ({values, callbacks}) => {
        useEffect(() => {
        
            callbacks.forEach(callback => callback())
        }, [...values])

        return (
            <></>
        )
    }

    const value = state[name]



    return {
        OnChangeValue,
        WatchFields,
        setState,
        OnChangeBlurDirty,
        isDirty,
        state,
        requireField,
        isFormDisabled,
        errorFieldsMessage,
        name,
        value

    }
}