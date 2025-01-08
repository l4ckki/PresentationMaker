import {editor} from "./data.ts";

let _editor = editor
let _handler: any = null;

function getEditor() {
    return _editor
}

function setEditor(newEditor: any) {
    _editor = newEditor
}

function dispatch(modifyFn: Function, payload?: Object): void {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor)

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function) {
    _handler = handler
}
export {
    getEditor,
    setEditor,
    dispatch,
    addEditorChangeHandler
}