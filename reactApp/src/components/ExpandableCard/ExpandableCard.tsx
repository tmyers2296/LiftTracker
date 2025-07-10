import { ReactNode, useState, useRef, useEffect, useReducer } from "react";
import useResizeObserver from "@react-hook/resize-observer";

import styles from "./ExpandableCard.module.css";

interface ExpandableCardProps {
    cardName: string;
    className?: string;
    children?: ReactNode;
    buttons?: { [buttonText: string]: () => void };
}

function ExpandableCard({
    cardName,
    className,
    children,
    buttons,
}: ExpandableCardProps) {
    // state hooks for whether or not exercises or routine are expanded or minimised:
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    // callback functions which change state hooks to exanded or not expanded
    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };

    useEffect(() => {
        if (!expanded) {
            setHeight("0px");
        } else if (contentRef.current) {
            // ensure height is set immediately on expand too
            setHeight(`${contentRef.current.scrollHeight * 1.5}px`);
        }
    }, [expanded]);

    useResizeObserver(contentRef.current, () => {
        if (contentRef.current && expanded) {
            console.log(
                `changing height to ${contentRef.current.scrollHeight * 1.5}`
            );

            setHeight(`${contentRef.current.scrollHeight * 1.5}px`);
        }
    });

    return (
        <div className={`${styles.expandableCard} ${className ?? ""}`}>
            <div
                className={`${styles.titleRow} ${
                    expanded ? styles.expandedBorder : ""
                }`}
            >
                <span className={styles.cardTitle}>{cardName}</span>
                <div className={styles.buttonContainer}>
                    {buttons
                        ? Object.keys(buttons).map((buttonText: string) => (
                              <button
                                  key={buttonText}
                                  className={styles.toggleButton}
                                  onClick={buttons[buttonText]}
                                  type="button"
                              >
                                  {buttonText}
                              </button>
                          ))
                        : ""}
                    <button
                        className={styles.toggleButton}
                        onClick={handleToggle}
                        type="button"
                    >
                        {expanded ? "−" : "+"}
                    </button>
                </div>
            </div>
            <div
                style={{ maxHeight: height }}
                className={styles.expandableContent}
            >
                <div ref={contentRef} className={styles.innerContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ExpandableCard;
