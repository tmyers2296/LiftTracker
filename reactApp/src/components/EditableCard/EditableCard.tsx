import { ReactNode, Children, useState, useEffect } from "react";
import styles from "./EditableCard.module.css";

import {
    routineObject,
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../types/routineTypes";

interface EditableCardProps<
    T extends routineObject | routineExerciseObject | routineExerciseSetObject,
    C extends routineExerciseObject | routineExerciseSetObject
> {
    cardName?: string;
    className?: string;
    children?: ReactNode;
    layerData: T;
    createItemButton: boolean;
    subComponent?: (item: C) => JSX.Element;
}

interface Item {
    id: number;
    content: ReactNode;
}

function EditableCard<
    T extends routineObject | routineExerciseObject | routineExerciseSetObject,
    C extends routineExerciseObject | routineExerciseSetObject
>({
    cardName,
    className,
    layerData,
    children,
    createItemButton,
    subComponent,
}: EditableCardProps<T, C>) {
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

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        if (subComponent) {
            console.log(layerData);
            let childItems: C[] = [];

            if ("exercises" in layerData) childItems = layerData.exercises;
            if ("sets" in layerData) childItems = layerData.sets;

            const initialItems = childItems.map(
                (childData: C, index: number) => ({
                    id: index,
                    content: subComponent(childData),
                })
            );

            setItems(initialItems);
        }
    }, [subComponent, layerData]);

    const handleAddItem = () => {
        if (!subComponent) return;

        if ("exercises" in layerData) {
            let newItemData: routineExerciseObject = {
                id: 0,
                exerciseId: 0,
                routineId: 0,
                exerciseName: "new exercise",
                order: 0,
                sets: [],
            };

            const newItem: Item = {
                id: Date.now(),
                content: subComponent(newItemData as C),
            };

            setItems((prev) => [...prev, newItem]);
        }

        if ("sets" in layerData) {
            let newItemData: routineExerciseSetObject = {
                id: 0,
                routineExerciseId: 0,
                repRangeLow: 0,
                repRangeHigh: 0,
                order: 0,
            };

            const newItem: Item = {
                id: Date.now(),
                content: subComponent(newItemData as C),
            };

            setItems((prev) => [...prev, newItem]);
        }
    };

    return (
        <div className={`${styles.expandableCard} ${className ?? ""}`}>
            {cardName && (
                <div className={`${styles.titleRow}`}>
                    <input
                        className={styles.inputBox}
                        defaultValue={cardName}
                    ></input>
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
                    {items.map((item) => item.content)}
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
                        <button
                            className={styles.createItemButton}
                            onClick={handleAddItem}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditableCard;
