import { ReactNode, useState } from "react";

import styles from "./ExpandableCard.module.css";

interface ExpandableCardProps {
    cardName: string;
    className?: string;
    children?: ReactNode;
    buttons?: [string];
}

function ExpandableCard({
    cardName,
    className,
    children,
    buttons,
}: ExpandableCardProps) {
    // state hooks for whether or not exercises or routine are expanded or minimised:
    const [expanded, setExpanded] = useState(false);

    // callback functions which change state hooks to exanded or not expanded
    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };

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
                        ? buttons.map((buttonText: string) => (
                              <button
                                  key={buttonText}
                                  className={styles.toggleButton}
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
            {expanded ? children : null}
        </div>
    );
}

export default ExpandableCard;
