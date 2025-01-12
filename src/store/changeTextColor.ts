import { Slide } from "./PresentationType";

export function changeTextColor(slide: Slide, elementId: string, newFontColor: string): Slide 
{
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "text" ? { 
                ...item, 
                fontColor: newFontColor 
            } : item
        ),
    };
}