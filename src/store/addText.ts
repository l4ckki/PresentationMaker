import {EditorType} from "./EditorType.ts";
import {TextItem} from "./PresentationType.ts";

function addText(editor: EditorType): EditorType {
    const currSlideId = editor.selection?.selectedSlideId;
    const currSlide = editor.presentation.slides.find(slide => slide.id === currSlideId);

    if (!currSlide) {
        return editor;
    }

    const newTextItem: TextItem = {
        id: `text${currSlide.elements!.length + 1}`,
        type: "text",
        text: "Drink water",
        fontFamily: 'Arial',
        fontSize: 44,
        color: '#000000',
        pos: {x: 170, y: 100},
        size: {width: 200, height: 50},
    };

    const updatedElements = [...currSlide.elements!, newTextItem];
    const updatedSlide = {...currSlide, elements: updatedElements};

    const updatedSlides = editor.presentation.slides.map(slide => slide.id === currSlideId ? updatedSlide : slide);

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    }
}

export {
    addText
}