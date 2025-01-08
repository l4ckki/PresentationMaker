import { EditorType } from "./EditorType";

export function removeElement(editor: EditorType): EditorType
{
    if (!editor.selection) {
        return editor;
    }

    const selectedSlideId = editor.selection.selectedSlideId;
    const removeObjectId = editor.selection.selectedObjectId;
    const targetSlide = editor.presentation.slides.find(SlideO => SlideO.id === selectedSlideId);

    if (!targetSlide) {
        return editor;
    }

    const newContent = targetSlide.elements.filter(elements => elements.id !== removeObjectId);
    let newSelectedObjectId = null;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(SlideO =>
                SlideO.id === selectedSlideId ? {
                    ...SlideO,
                    elements: newContent,
                } : SlideO
            ),
        },
        selection: {
            selectedSlideId: selectedSlideId,
            selectedObjectId: newSelectedObjectId,
        },
    };
}