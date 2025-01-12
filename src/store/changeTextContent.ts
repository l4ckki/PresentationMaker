import { Slide } from "./PresentationType";

export function changeTextContent(slide: Slide, elementId: string, newText: string): Slide
{
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "text" ? { 
                ...item, 
                value: newText 
            } : item
        ),
    };
}