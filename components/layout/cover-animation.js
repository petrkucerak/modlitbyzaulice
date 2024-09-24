import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

export default function CoverAnimation({className}) {
  const animationContainer = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "cover-animation.json",
      rendererSettings: {
        title: "Modlitby za Pardubice",
        description: "Proměňme město Pardubice modlitbou",
        progressiveLoad: true,
      },
    });
  }, []);
  return <div className={`${className}`} ref={animationContainer}></div>;
}
