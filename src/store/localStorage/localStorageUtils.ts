import { EditorType } from "../EditorType";
import { validateEditor } from "./validation";

export const saveToLocalStorage = (editor: EditorType) => {
    try {
        const serializedState = JSON.stringify(editor);
        localStorage.setItem('presentationEditor', serializedState);
    } catch (err) {
        console.error('Error saving to LS:', err);
    }
};

export const loadFromLocalStorage = (): EditorType | null => {
    try {
        const serializedState = localStorage.getItem('presentationEditor');

        if (!serializedState) {
            console.error('No data');
            return null;
        }

        const editState = JSON.parse(serializedState) as EditorType;
        return editState;
    } catch (err) {
        console.error('Error loading from LS:', err);
        return null;
    }
}