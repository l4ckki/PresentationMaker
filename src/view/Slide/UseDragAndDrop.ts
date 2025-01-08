import { useState, useRef } from "react";
import { dispatch } from "../../store/editor";
import { EditorType } from "../../store/EditorType";
import { moveSlideElement } from "../../store/moveSlideElement";

type DragAndDropProps = {
    slideId: string;
}

export function DragAndDrop({slideId}: DragAndDropProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElemId, setDraggedElemId] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});
    const elementStartPos = useRef({x: 0, y: 0});

    function handleElementMD(event: React.MouseEvent, elementId: string): void {
        event.preventDefault();
        setIsDragging(true);
        setDraggedElemId(elementId);
        dragStartPos.current = {x: event.clientX, y: event.clientY};

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            const element = slide?.elements.find(e => e.id === elementId);
            if (element) {
                elementStartPos.current = {x: element.pos.x, y: element.pos.y};
            }
            return currentEditor;
        });
    }

    function handleElementMM(event: React.MouseEvent): void {
        if (!isDragging || !draggedElemId) {
            return;
        }

        const dx = event.clientX - dragStartPos.current.x;
        const dy = event.clientY - dragStartPos.current.y;

        dispatch((currentEditor: EditorType) => {
            const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
            if (!slide) return currentEditor;
            const element = slide.elements.find(e => e.id === draggedElemId);
            if (!element) return currentEditor;

            const newX = Math.max(0, Math.min(elementStartPos.current.x + dx, 900 - element.size.width));
            const newY = Math.max(0, Math.min(elementStartPos.current.y + dy, 500 - element.size.height));

            return moveSlideElement(currentEditor, slideId, draggedElemId, newX, newY);
        });
    }

    function handleElementMU(): void {
        setIsDragging(false);
        setDraggedElemId(null);
    }

    return {
        isDragging, 
        handleElementMD, handleElementMM, handleElementMU,
    }
}