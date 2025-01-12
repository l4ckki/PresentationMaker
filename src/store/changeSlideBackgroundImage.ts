import { EditorType } from "./EditorType";
import { BackgroundImage } from "./PresentationType";

export function changeBackgroundImage(editor: EditorType, imageSrc: string): EditorType
{
    const newBackground: BackgroundImage = {
        type: 'image',
        src: imageSrc, 
    };

    if (!editor.selection || !editor.selection.selectedSlideId)
    {
        return editor;
    }

    const updatedSlides = editor.presentation.slides.map(slide => {
        if (slide.id === editor.selection.selectedSlideId)
        {
            return {
                ...slide,
                background: newBackground,
            };
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    };
}