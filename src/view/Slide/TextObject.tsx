import {TextItem} from '../../store/PresentationType.ts';
import {CSSProperties} from "react";
import { useState } from "react";

type TextObjectProps = {
    textObject: TextItem,
    scale?: number,
    isSelected: boolean,
}

function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [textValue, setTextValue] = useState(() => {
        const storedText = localStorage.getItem(`text_${textObject.id}`);
        return storedText ? storedText : textObject.text; 
    });

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

    const handleDoubleClick = () => { setIsEditing(true); };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTextValue(e.target.value); };
    
    const handleBlur = () => { 
        setIsEditing(false); 
        localStorage.setItem(`text_${textObject.id}`, textValue);
    };

    return (
        <>
        {isEditing ? (
            <input type="text"
                value={textValue}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
                style={{...textObjectStyles, fontSize: `${textObject.fontSize * scale}px`,}}
                />
        ) : (
            <p onDoubleClick={handleDoubleClick} style={textObjectStyles}>
                {textValue}
            </p>
            )}
        </>

    )
}

export {
    TextObject
}