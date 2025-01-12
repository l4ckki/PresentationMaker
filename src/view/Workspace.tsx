import {Slide} from "../store/PresentationType.ts";
import styles from './Workspace.module.css'
import {DisplaySlide} from "./Slide/Slide";

type WorkspaceProps = {
    slide: Slide,
    className: string,
    isSelected: boolean,
    selectedObjectId: string | null,
}

function Workspace({slide, selectedObjectId}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            <DisplaySlide slide={slide} className={styles.slide} isSelected={false} selectedObjectId={selectedObjectId}></DisplaySlide>
        </div>
        
    )
}

export {
    Workspace
}