import { useState } from "react";
import { createNotepad } from "../../api/notepad";

const AddNote = ({ show, onClose }) => {
    const [title, setTitle] = useState("Klik Judul");
    const [content, setContent] = useState("");

    if (!show) {
        return null;
    }

    const onSubmit = () => {
        const payload = {
            title,
            content
        };
        createNotepad(payload).then((res) => {
            setContent("");
            setTitle("Klik Judul");
            onClose();
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50 justify-center items-center" onClick={onClose}>
            <div className="bg-white overflow-hidden relative rounded-md border border-indigo-900 w-96 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
                <img onClick={onClose} src="/svg/arrowBack.svg" alt="arrow back" className="hover:cursor-pointer absolute top-0 left-0 w-6 mt-3 ml-3" />

                <div className="flex flex-col ">
                    <input type="text" className="w-full focus:outline-none text-center py-4 px-3" placeholder="Ketik Judul" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <textarea type="text" className="w-full px-8 pt-5 focus:outline-none h-80" placeholder="Ketik sesuatu yang anda pikirkan....." value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="p-2 flex justify-end">
                    <button className="bg-indigo-900 text-white px-4 py-2 rounded-md text-sm" onClick={onSubmit}>Simpan</button>
                </div>
            </div>
        </div>
    );
}

export default AddNote;
