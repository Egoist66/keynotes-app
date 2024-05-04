import {FC} from "react";
import KeyNotes from "../KeyNotes/KeyNotes";


const App: FC = () => {
    return (
        <KeyNotes
            
            autoSlide={{on: false, speed: 3}}
            defaultBackground="ghostwhite"


        />
    );
};



export default App;
