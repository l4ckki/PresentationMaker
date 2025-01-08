import {TextItem} from '../../store/PresentationType.ts';
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: TextItem,
    scale?: number,
    isSelected: boolean,
}

function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        /* Позиционирование */
        position: 'absolute',
        top: `${textObject.pos.y * scale}px`,
        left: `${textObject.pos.x * scale}px`,
        zIndex: 3,
        
        /* Блочная модель */
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        margin: 0,

        /* Типографика */
        fontSize: `${textObject.fontSize * scale}px`,
        color: textObject.color,
        
        /* Оформление */
        border: isSelected ? '3px solid #0b57d0' : 'none',
    }

    return (
        <p style={textObjectStyles}>{textObject.text}</p>
    )
}

export {
    TextObject
}