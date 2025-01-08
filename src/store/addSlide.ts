import {EditorType} from "./EditorType.ts";
import {Slide} from "./PresentationType.ts";
import { generateRandomId } from "./generateRandomId";

export function addSlide(editor: EditorType): EditorType
{
    const newSlide: Slide = {
        id: `slide-${generateRandomId(6)}`,
        elements: [],
        background: {type: 'solid', src: '#FFFFFF'}
    }

    const selectedSlideindex = editor.presentation.slides.findIndex(SlideO => SlideO.id == editor.selection.selectedSlideId);

    return {
        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides.slice(0, selectedSlideindex + 1),
                newSlide,
                ...editor.presentation.slides.slice(selectedSlideindex + 1)
            ]
        },
        selection: editor.selection
    };
}