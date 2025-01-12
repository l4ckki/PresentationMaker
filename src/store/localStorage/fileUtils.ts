import { validateEditor } from "./validation";
import { EditorType } from "../EditorType";

export const exportPresentation = (editor: EditorType) => {
    const dataStr = JSON.stringify(editor, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'presentation.json';
    const linkElem = document.createElement('a');

    linkElem.setAttribute('href', dataUri);
    linkElem.setAttribute('download', exportFileDefaultName);
    linkElem.click();
}

export const importPresentation = (file: File): Promise<EditorType> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const parsedContent = JSON.parse(content) as EditorType
                
                resolve(parsedContent);
            } catch (err) {
                reject(err)
            }
        };
        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
    });
}