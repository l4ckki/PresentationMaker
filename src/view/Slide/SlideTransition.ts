import { useState } from "react";
import { dispatch } from "../../store/editor";
import { changeSlidePosition } from "../../store/moveListElement";
import { EditorType } from "../../store/EditorType";

export function SlideTransition() {
    const [draggingSlide, setDraggingSlide] = useState<string | null>(null);
    const [dragOverSlide, setDragOverSlide] = useState<string | null>(null);

    function handleDragStart(slideId: string) {
        setDraggingSlide(slideId);
    }

    function handleDragOver(e: React.DragEvent, slideId: string) {
        e.preventDefault();
        if (slideId !== dragOverSlide) {
            setDragOverSlide(slideId);
        }
    }

    function handleDragEnd() {
        if (draggingSlide && dragOverSlide && draggingSlide !== dragOverSlide) {
            dispatch((currentEditor: EditorType) => 
                changeSlidePosition(currentEditor, draggingSlide, dragOverSlide)
            );
        }
        setDraggingSlide(null);
        setDragOverSlide(null);
    }

    return {
        draggingSlide, dragOverSlide, 
        handleDragStart, handleDragOver, handleDragEnd,
    };
}