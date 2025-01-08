export type Presentation = {
    id: string;
    title: string;
    slides: SlideCollection;
}

export type ElementItem = ImageItem | TextItem;

export type ImageItem = BaseSlideObject & {
    type: "image";
    src: string;
}

export type TextItem = BaseSlideObject & {
    type: "text";
    text: string;
    fontFamily: string;
    fontSize: number;
    color: string;
}

export type Slide = {
    id: string;
    background: Background;
    elements: ElementItem[];
}

export type SlideCollection = Slide[];

export type Background = BackgroundSolid | BackgroundImage;

export type BackgroundSolid = {
    type: "solid";
    src: string;
}

export type BackgroundImage = {
    type: "image";
    src: string;
}

type Pos = {
    x: number;
    y: number;
}

type Size = {
    width: number;
    height: number;
}

export type BaseSlideObject = {
    id: string;
    pos: Pos;
    size: Size;
}

