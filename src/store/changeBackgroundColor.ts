import { EditorType } from "./EditorType";
import { BackgroundSolid } from "./PresentationType";

export function changeBackgroundColor(editor: EditorType, payload?: Object): EditorType
{
    if (!editor.selection || !editor.selection.selectedSlideId)
    {
        return editor;
    }

    const updateSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                background: payload as BackgroundSolid,
            };
        }
        return SlideO;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updateSlides,
        }
    }
}