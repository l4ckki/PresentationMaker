import {EditorType} from "./EditorType.ts";

function removeSlide(editor: EditorType): EditorType {
    if (!editor.selection) {
        return editor
    }
    const removeSlideId: string = editor.selection.selectedSlideId!
    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == removeSlideId)
    const newSlide = editor.presentation.slides.filter(slide => slide.id != removeSlideId)
    let newSelectedSlideId = null
    if (newSlide.length > 0) {
        const slideIndex = Math.min(removeSlideIndex, newSlide.length - 1)
        newSelectedSlideId = newSlide[slideIndex].id
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlide
        },
        selection: {
            selectedSlideId: newSelectedSlideId!,
            selectedObjectId: editor.selection.selectedObjectId,
        }
    }
}

export {
    removeSlide
}