import {Slide} from '../store/PresentationType.ts';
import {DisplaySlide} from './Slide/Slide.tsx';
import styles from "./SlideList.module.css";
import {SelectionType} from '../store/EditorType.ts'
import {dispatch} from "../store/editor.ts";
import {setSelection} from "../store/setSelection.ts";
import { SlideTransition } from "./Slide/SlideTransition";

const SLIDE_SCALE: number = 0.2

type SlidesListProps = {
    slides: Array<Slide>,
    selection?: SelectionType,
}

function SlidesList({slides, selection}: SlidesListProps) {
    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = SlideTransition();

    function onSlideClick(slideId: string) {
        dispatch(setSelection, {selectedSlideId: slideId})
    }

    return (
        <main className={styles.slideList}>
            {slides.map(slide =>
                <div key={slide.id}  draggable
                onDragStart={() => handleDragStart(slide.id)}
                onDragOver={(e) => handleDragOver(e, slide.id)}
                onDragEnd={handleDragEnd} 
                onClick={() => onSlideClick(slide.id)}
                className={draggingSlide === slide.id ? 'dragging' : (dragOverSlide === slide.id ? 'dragover' : '')}>
                    <DisplaySlide
                        slide={slide}
                        scale={SLIDE_SCALE}
                        isSelected={slide.id == selection!.selectedSlideId}
                        className={slide.id == selection!.selectedSlideId ? 
                            `${styles.item}, ${styles.item, styles.selected}` : styles.item }
                        selectedObjectId = {selection!.selectedObjectId}
                        showResizeHandles = {false}
                        disableElementDrag = {true}
                    ></DisplaySlide>
                </div>
            )}
        </main>
    )
}

export {
    SlidesList
}