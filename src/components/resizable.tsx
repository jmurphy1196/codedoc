import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [resizeWidth, setResizeWidth] = useState(window.innerWidth * 0.75);
  let resizableProps: ResizableBoxProps =
    direction === "vertical"
      ? {
          maxConstraints: [Infinity, windowHeight * 0.9],
          height: 300,
          width: Infinity,
          resizeHandles: ["s"],
        }
      : {
          className: "resize-horizontal",
          minConstraints: [windowWidth * 0.2, Infinity],
          maxConstraints: [windowWidth * 0.75, Infinity],
          height: Infinity,
          width: resizeWidth,
          resizeHandles: ["e"],
          onResizeStop: (e, data) => {
            setResizeWidth(data.size.width);
          },
        };

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < resizeWidth) {
          setResizeWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [resizeWidth]);

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
