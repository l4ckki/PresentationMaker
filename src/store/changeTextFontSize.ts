import { Slide } from "./PresentationType";

export function changeTextFontSize(slide: Slide, elementId: string, newSize: {width: number, height: number}): Slide 
{
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "text" ? { 
                ...item, 
                size: newSize 
            } : item
        ),
    };
}