import { useRef, useState, useEffect } from "react";
import classes from "./styles.module.scss";

const COLLAPSED_HEIGHT = 80;

const TEXT = `
React is a JavaScript library for building user interfaces.
It allows developers to create reusable UI components.
Read More and Read Less components are commonly asked in interviews.
The challenge is to animate height because CSS cannot transition
from height: auto to height: 0.
Using scrollHeight is the cleanest solution.
`;

export default function ReadMoreReadLess() {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(COLLAPSED_HEIGHT);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    setHeight(expanded ? el.scrollHeight : COLLAPSED_HEIGHT);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    const handleResize = () => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [expanded]);

  return (
    <div className={classes.container}>
      <div className={classes.content} style={{ height }}>
        <div ref={contentRef}>{TEXT}</div>
      </div>

      <button
        type="button"
        className={classes.toggle}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}
