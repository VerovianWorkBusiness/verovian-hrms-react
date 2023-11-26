import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UndoIcon from '../../../assets/img/icons/undo.svg'
import RedoIcon from '../../../assets/img/icons/redo.svg'

const Wysiwyg = ({fieldTitle, initialValue, updateValue, hasError}) => {
    const [value, setValue] = useState(initialValue);
    const [reactQuillRef, setReactQuillRef] = useState('')
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','color'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            // [{ 'script': 'sub'}, { 'script': 'super' }],
            ['link', 'image', 'video']
        ],
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        }
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'color',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    function undoChange() {
        let myEditor = reactQuillRef.getEditor();
        myEditor.history.undo();
    }

    function redoChange() {
        let myEditor = reactQuillRef.getEditor();
        myEditor.history.redo();
    }

    const changeValue = (input) => {
        // console.log(input)
        setValue(input)
        updateValue(input)
    }

    return (
        <div className="relative">
            {fieldTitle && fieldTitle !== "" && <label className={`block text-gray-500 font-medium font-montserrat mb-2 text-sm`}>{fieldTitle}</label>}
            {/* <button onclick={modules.history.undo()}>UNDO</button> */}
            <div className={`absolute ${fieldTitle && fieldTitle !== "" ? 'top-9' : 'top-2'}`}>
                <button className="ql-undo mr-5" onClick={undoChange}>
                    <img alt="" src={UndoIcon} />
                </button>
                <button className="ql-redo" onClick={redoChange}>
                    <img alt="" src={RedoIcon} />
                </button>
            </div>
            <ReactQuill 
                ref={(el) => {setReactQuillRef(el)}}
                theme="snow" 
                value={value} 
                modules={modules} 
                formats={formats} 
                onChange={changeValue}
            >
                {/* <div className="" /> */}
            </ReactQuill>
        </div>
    );
}

export default Wysiwyg
