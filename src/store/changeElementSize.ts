import { Slide } from "./PresentationType";

export function changeElementSize(slide: Slide, elementId: string, newSize: {width: number, height: number}): Slide 
{
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId ? { 
                ...item, 
                size: newSize 
            } : item
        ),
    };
}