import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

export default function CoverAnimation({ className }) {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false, // Don't loop the full animation
      autoplay: true,
      path: "cover-animation.json",
      rendererSettings: {
        title: "Modlitby za Pardubice",
        description: "Proměňme město Pardubice modlitbou",
        progressiveLoad: true,
      },
    });

    // animation.addEventListener("complete", () => {
    //   animation.playSegments(
    //     [animation.totalFrames, animation.totalFrames - 20],
    //     true
    //   );
    // });

    // return () => {
    //   animation.destroy(); // Cleanup on component unmount
    // };
  }, []);

  return <div className={`${className}`} ref={animationContainer}></div>;
}
