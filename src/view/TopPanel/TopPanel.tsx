import styles from './TopPanel.module.css';
import {Button} from '../../components/button/Button.tsx';
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {addSlide} from "../../store/addSlide.ts";
import {addImage} from "../../store/addImage.ts";
import {addText} from "../../store/addText.ts";
import { removeElement } from '../../store/removeElement.ts';
import {changeSlideBackground} from "../../store/changeSlideBackground.ts";
import {Background} from "../../store/PresentationType.ts";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import React from "react";

type TopPanelProps = {
    title: string,
}

function TopPanel({title}: TopPanelProps) {

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

    function onRemoveElement() {
        dispatch(removeElement)
    }

    function onChangeBackgroundColor() {
        const newBackground: Background = {type: "solid", src: "#000000"};
        dispatch(changeSlideBackground, newBackground);
    }

    function onChangeBackgroundImage() {
        const newBackground: Background = {type: "image", src: "../../src/image/DogHappy.jpg"};
        dispatch(changeSlideBackground, newBackground);
    }
    
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }

    return (
        
        <div className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} 
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
                        value={'#FF0000'}
                        onInput={() => {}}
                    ></input>
                </button>
                <Button className={styles.button} text={"Изменить изображение фона слайда"}
                        onClick={onChangeBackgroundImage}/>
            </section>
        </div>
    )
}

export {
    TopPanel
}