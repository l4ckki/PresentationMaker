import { Slide } from "./PresentationType";

export function changeTextFontFamily(slide: Slide, elementId: string, newFontFamily: string): Slide 
{
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "text" ? { 
                ...item, 
                fontFamily: newFontFamily 
            } : item
        ),
    };
}