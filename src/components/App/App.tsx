import { FC } from "react";
import KeyNotes from "../KeyNotes/KeyNotes";

const App: FC = () => {
  return (
    <KeyNotes
      autoSlide={{ on: false, speed: 3 }}
      defaultBackground="ghostwhite"
      data={[
        {
          id: 0,
          title: "Title 1",
          content: `Hello title1`,
   
        },

        { id: 1,
          title: "Title 2",
          content: "Hello guys2",
       
        },

        { id: 2,
          title: "Title 3",
          content: "Hello guys3",
         
        },
        { id: 3,
          title: "Title 4",
          content: "Hello guys4",

        },
      ]}
      bgColors={["skyblue", "grey", "orange", "ghostwhite"]}
    />
  );
};

export default App;
