import {ImageItem} from '../../store/PresentationType.ts';
import {CSSProperties} from "react";

type ImageObjectProps = {
    imageObject: ImageItem,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected}: ImageObjectProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.y * scale}px`,
        left: `${imageObject.pos.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    }  

    if (isSelected) {
        imageObjectStyles.border = '3px solid #0b57d0'
    }

    return (
        <img style={imageObjectStyles} src={imageObject.src}/>
    )
}

export {
    ImageObject,
}