import {KeyNoteData} from "../types/use-key-notes/use-key-notes-types.ts";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {adapter} from "../utils/adapter.ts";
import {delay} from "../utils/delay.ts";
import {useLS} from "./useLS.ts";
import Swal from 'sweetalert2'

export const useUploadFile = () => {

    const [state, setState] = useState<{ message: string, slides: KeyNoteData[], loading: boolean, error: boolean }>({
        loading: false,
        error: false,
        slides: [],
        message: ''
    })

    const {set, exist, get} = useLS()
    const input = useRef<HTMLInputElement>(null)

    const triggerUpload = () => {
        if (input.current) {
            input.current.click()
        }
    }
    const upload = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.files) {
            const file = e.currentTarget?.files[0]
            const reader = new FileReader()
            reader?.readAsText(file)

            reader.onload = async () => {
                setState({
                    ...state,
                    loading: true,
                    message: 'Uploading...',
                })
                try {

                    await delay(1200)
                    const slides = adapter<KeyNoteData[]>(reader.result)
                    if (!Array.isArray(slides)) {
                        setState({
                            ...state,
                            loading: false,
                            message: 'File is not uploaded',

                        })
                        await Swal.fire({
                            title: "Error while uploading",
                            text: "Perhaps structure of the file does not fit for the slides",
                            icon: "error"
                        });
                        return
                    }
                    if (slides) {
                        console.log(slides)
                        setState({
                            ...state,
                            loading: false,
                            message: 'File is uploaded',
                            slides
                        })

                        await Swal.fire({
                            title: "Upload success!",
                            text: "Slides are ready to be viewed",
                            confirmButtonColor: 'rgb(48, 133, 214)',
                            icon: "success"
                        });

                        input.current ? input.current.value = '' : null

                        await delay(500)
                        setState({
                            ...state,
                            slides,
                            message: '',
                        })
                    }

                } catch (e) {
                    setState({
                        ...state,
                        loading: false,
                        message: 'File is not uploaded',

                    })

                    await Swal.fire({
                        title: "Error while uploading",
                        text: "Wrong file format!",
                        confirmButtonColor: 'rgb(48, 133, 214)',
                        icon: "error"
                    });

                }

            }
            
            reader.onerror = () => {
                console.log(reader.error);
                setState({
                    ...state,
                    loading: false,
                    error: true,
                    message: `There is an error while uploading ${file.name}`
                })
            };

        }


    }

    const remove = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "Slides will be totally destroyed",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: 'rgb(48, 133, 214)',
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {

                setState({
                    ...state,
                    slides: []
                })
                set('slides', [])
                input.current ? input.current.value = '' : null

            }
        });

    }
    useEffect(() => {
        if (state.slides.length) {
            set('slides', state.slides)
        }
    }, [state.slides])

    useEffect(() => {
        if (exist('slides')) {
            setState({
                ...state,
                slides: get<KeyNoteData[]>('slides')
            })
        }
    }, [])


    const {loading, error, message, slides} = state

    return {

        message,
        slides,
        error,
        loading,
        input,
        triggerUpload,
        remove,
        upload,


    }


}