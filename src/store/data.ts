 import {Slide, Presentation } from '../store/PresentationType';
 import {EditorType} from "./EditorType.ts";

 const slide1: Slide = {
    id: 'slide-1',
     elements: [
         {
             id:'element-1',
             pos: {x: 10, y: 20},
             size: {width: 10, height: 20},
             type: "text",
             text: "Drink juice",
             fontFamily: 'Arial',
             fontSize: 15,
             color: '#FF000'
         },
         {
             id: 'element-2',
             pos: {x: 170, y: 170},
             size: {width: 200, height: 200},
             type: "image",
             src: '../src/image/DogSad.jpg',
         }
     ],
     background: {
        type: "solid",
        src: "#669bbc",
     },
 }

 const slide2: Slide = {
     id: "slide-2",
     elements: [
     ],
     background: {
         type: "solid",
         src: "#a3b18a"
     },
 }


const presentation: Presentation = {
    title: "выыв",
    slides: [slide1, slide2],
}

 const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: null,
    },
}


export {
    editor,
}