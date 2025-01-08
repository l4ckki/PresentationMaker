import styles from './App.module.css';
import {SlidesList} from './view/SlidesList.tsx';
import {TopPanel} from './view/TopPanel/TopPanel.tsx';
import {Workspace} from './view/Workspace.tsx';
import {EditorType} from "./store/EditorType.ts";

type AppProps = {
    editor: EditorType
}

function App({editor}: AppProps) {
    const selectedSlide = editor.presentation.slides.find(
        (slide) => slide.id === editor.selection?.selectedSlideId
    );

    return (
        <>
            <TopPanel title={editor.presentation.title}/>
            <div className={styles.container}>
                <SlidesList slides={editor.presentation.slides} selection={editor.selection!}></SlidesList>
                {selectedSlide ? (
                    <Workspace 
                        slide={selectedSlide} 
                        className={styles.workspace} 
                        isSelected={true}
                        selectedObjectId={editor.selection.selectedObjectId}
                        
                    />
                ) : (
                    <div className={styles.emptyWorkspace}>
                        Нет доступных слайдов.
                    </div>
                )
            }
            </div>
        </>
    )
}

export default App