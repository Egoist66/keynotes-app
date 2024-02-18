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
          title: "Title 1",
          content: `It began with an idea: help developers deliver better quality software.But evolution is inherent to business—and technology—and we’ve evolved, too. Today, we connect the right people to the right technology, devise optimized processes that deliver exceptional quality software, and create a path to your vision’s realization.
          Everyone has their own story to tell, their own journey to take, and their own path to get there. At Forte Group, we make the path easier. We remove the common obstacles from getting from Point A to Point B. A smoother road. An engine to accelerate. A bridge between people and technology. A pathway to what’s possible.`,
          // pictures:
          //   "https://fortegrp.com/wp-content/uploads/2024/02/PreviewBanner.jpg",
        },

        {
          title: "Title 2",
          content: "Hello guys2",
          // pictures:
          //   "https://fortegrp.com/wp-content/uploads/2024/02/LinkedInBanner-Option-2.png",
        },

        {
          title: "Title 3",
          content: "Hello guys3",
          // pictures:
          //   "https://fortegrp.com/wp-content/uploads/2024/02/ai-integration-for-devops-and-platform-engineering.png",
        },

        {
          title: "Title 4",
          content: "Hello guys4",
          // pictures:
          //   "https://fortegrp.com/wp-content/uploads/2024/01/HeroBanner-Option-1-1.png",
        },
      ]}
      bgColors={["skyblue", "violet", "pink", "cyan"]}
    />
  );
};

export default App;
