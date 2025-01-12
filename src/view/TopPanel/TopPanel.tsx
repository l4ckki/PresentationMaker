import styles from './TopPanel.module.css';
import {Button} from '../../components/button/Button.tsx';
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {addSlide} from "../../store/addSlide.ts";
import {addImage} from "../../store/addImage.ts";
import {addText} from "../../store/addText.ts";
import {removeElement} from '../../store/removeElement.ts';
import {changeSlideBackground} from "../../store/changeSlideBackground.ts";
import {Background} from "../../store/PresentationType.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import {exportPresentation} from '../../store/localStorage/fileUtils';
import {importPresentation} from '../../store/localStorage/fileUtils';
import {getEditor} from '../../store/editor';
import { changeBackgroundImage } from '../../store/changeSlideBackgroundImage.ts';
import React from "react";

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {

    const [color, setColor] = React.useState("#000000"); // Состояние для хранения цвета

    function onAddSlide() {
        dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    function onAddText() {
        dispatch(addText)
    }

    const imageInputRef = React.useRef<HTMLInputElement | null>(null);
    const backgroundImageInputRef = React.useRef<HTMLInputElement | null>(null); 

    function onChangeBackgroundImage(event: React.ChangeEvent<HTMLInputElement>) { 
        const file = event.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(changeBackgroundImage, imageUrl); 
            };

            reader.readAsDataURL(file);
        }
    }

    function onAddImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(addImage, imageUrl); 
            };

            reader.readAsDataURL(file);
        }
    }

    function onExportPresentachion() {
        const editor = getEditor();
        exportPresentation(editor);
    }

    function onImportPresentachion(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            importPresentation(file)
                .then((parsedContent) => {
                    dispatch(() => parsedContent);
                })
                .catch((err) => {
                    console.error('Error importing presentation:', err);
                    alert('Please check the file format.');
                });
        }
    }

    function onRemoveElement() {
        dispatch(removeElement)
    }

    function onChangeBackgroundColor() {
        const newBackground: Background = {type: "solid", src: color};
        dispatch(changeSlideBackground, newBackground);
    }

    function onColorInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setColor(event.target.value); // Обновляем цвет в состоянии
        onChangeBackgroundColor(); // Меняем фон
    }
    
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    return (
        
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" value={title} 
            placeholder='Введите название презентации' onChange={onTitleChange}/>

            <section className={styles.buttonContainer}>

                <Button className={styles.button} text={"Добавить слайд"} onClick={onAddSlide}/>

                <Button className={styles.button} text={"Удалить слайд"} onClick={onRemoveSlide}/>

                <Button className={styles.button} text={"Добавить текст"} onClick={onAddText}/>

                <button className={styles.button}>
                <input 
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={onAddImage}
                    style={{ display: 'none' }}
                    ref={imageInputRef}
                />
                <span onClick={() => imageInputRef.current?.click()}>Добавить Изображение</span>
                </button>

                <Button className={styles.button} text={"Удалить элемент"} onClick={onRemoveElement}/>

                <button className={styles.button} onClick={onChangeBackgroundColor}>
                    Фон
                    <input
                        className={styles.colorpicker} 
                        type={'color'} 
                        value={color}
                        onInput={onColorInputChange}
                    ></input>
                </button>
                
                <button className={styles.button} onClick={() => backgroundImageInputRef.current?.click()}>
                    <input
                        type="file"
                        id="imageUploader"
                        accept='image/*'
                        onChange={onChangeBackgroundImage}
                        className={styles.imageUploader}
                        style={{ display: 'none' }}
                        ref={backgroundImageInputRef}
                    />
                    Фон слайда
                </button>

                <button className={styles.button} onClick={onExportPresentachion}>
                Экспорт
                </button>

                <button 
                    className={styles.button} 
                    onClick={() => document.getElementById('importFile')?.click()}>
                    Импорт
                    <input
                    type="file"
                    id="importFile"
                    accept='.json'
                    onChange={onImportPresentachion}
                    className={styles.fileInput}
                    style={{ display: 'none' }}/>
                </button>

            </section>
        </div>
    )
}

export {
    TopPanel
}