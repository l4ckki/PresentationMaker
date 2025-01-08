import { EditorType } from "./EditorType";
import { ImageItem } from "./PresentationType";

export function addImage(editor: EditorType, imageSrc: string): EditorType
{   
    const currSlideId = editor.selection?.selectedSlideId;
    const currSlide = editor.presentation.slides.find(slide => slide.id === currSlideId);

    if (!currSlide) {
        return editor;
    }

    const newImage: ImageItem = {
        id: `image${currSlide.elements!.length + 1}`,
        pos: {x: 400, y: 300},
        size: {width: 200, height: 150},
        type: 'image',
        src: imageSrc,
    }

    const updatedSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection!.selectedSlideId) {
            return {
                ...SlideO,
                elements: [...SlideO.elements!, newImage],
            };
        }
        return SlideO;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    }
}