import { FC } from "react";
import KeyNotes from "./KeyNotes";

const App: FC = () => {
  return (
    <KeyNotes
      enableControls={true}
      autoSlide={{ on: false, speed: 3 }}
      defaultBackground="ghostwhite"
      data={[
        {
          id: 0,
          pictures: 'https://fortegrp.com/wp-content/uploads/2024/02/LinkedInBanner-Option-2.png',
          title: "Title 1",
          content: `It began with an idea: help developers deliver better quality software.But evolution is inherent to business—and technology—and we’ve evolved, too. Today, we connect the right people to the right technology, devise optimized processes that deliver exceptional quality software, and create a path to your vision’s realization.
          Everyone has their own story to tell, their own journey to take, and their own path to get there. At Forte Group, we make the path easier. We remove the common obstacles from getting from Point A to Point B. A smoother road. An engine to accelerate. A bridge between people and technology. A pathway to what’s possible.`,
   
        },

        { id: 1,
          pictures: 'https://fortegrp.com/wp-content/uploads/2024/02/HeroBanner-Option-2.png',
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
      // bgColors={["skyblue", "violet", "pink", "cyan"]}
    />
  );
};

export default App;
