import { useState, useEffect } from "react";

// Hook
function useChangeWidthHeightSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [widthSize, setWidthSize] = useState(
    typeof window !== "undefined"
      ? JSON.parse(window.innerWidth.toString())
      : null
  );
  // window.innerWidth);
  const [width, setWidth] = useState(180);
  const [height, setHeight] = useState(80);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWidthSize(window.innerWidth);

      if (window.innerWidth < 400) {
        setWidth(220);
        setHeight(80);
      } else if (window.innerWidth >= 400 && window.innerWidth < 640) {
        setWidth(250);
        setHeight(100);
      } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setWidth(180);
        setHeight(60);
      } else if (window.innerWidth >= 768 && window.innerWidth < 928) {
        setWidth(160);
        setHeight(60);
      } else {
        setWidth(200);
        setHeight(80);
      }
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    height,
    width,
  };
}

export default useChangeWidthHeightSize;
