import { ReactNode } from "react";
import styles from "./EditableCard.module.css";

interface EditableCardProps {
    cardName?: string;
    className?: string;
    children?: ReactNode;
    createItemButton: boolean;
}

function EditableCard({
    cardName,
    className,
    children,
    createItemButton,
}: EditableCardProps) {
    const EDIT_BUTTONS: { [key: string]: () => void } = {
        "↑": () => {
            console.log("poop");
        },
        "↓": () => {
            console.log("poop");
        },
        "🗑": () => {
            console.log("poop");
        },
    };
    return (
        <div className={`${styles.expandableCard} ${className ?? ""}`}>
            {cardName && (
                <div className={`${styles.titleRow}`}>
                    <span className={styles.cardTitle}>{cardName}</span>
                    <div className={styles.buttonContainer}>
                        {Object.keys(EDIT_BUTTONS).map((buttonText: string) => (
                            <button
                                key={buttonText}
                                className={styles.toggleButton}
                                onClick={EDIT_BUTTONS[buttonText]}
                                type="button"
                            >
                                {buttonText}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className={styles.expandableContent}>
                <div
                    className={
                        cardName ? styles.innerContent : styles.innerContentRow
                    }
                >
                    {children}
                    {!cardName && (
                        <div className={styles.buttonContainer}>
                            {Object.keys(EDIT_BUTTONS).map(
                                (buttonText: string) => (
                                    <button
                                        key={buttonText}
                                        className={styles.toggleButton}
                                        onClick={EDIT_BUTTONS[buttonText]}
                                        type="button"
                                    >
                                        {buttonText}
                                    </button>
                                )
                            )}
                        </div>
                    )}
                    {createItemButton && (
                        <button className={styles.createItemButton}>+</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditableCard;
