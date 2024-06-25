import React from "react";
import { deleteNotepad } from "../../api/notepad";

const Note = ({ show, notepad, onAddNoteClick, onDetailNoteClick, onRefresh, onClose}) => {

    const handleDeleteNote = (id) => {
        deleteNotepad(id).then((res) => {
            onRefresh();
        }).catch((err) => {
            console.log(err);
        });
    };

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white overflow-hidden rounded-md border border-indigo-900 w-96 flex flex-col justify-between relative" onClick={(e) => e.stopPropagation()}>
                <div className="h-full">
                    <div className=" bg-indigo-100 p-3 border-b border-indigo-900 relative">
                        <h2 className="text-xl text-center font-bold  text-indigo-900">Memo</h2>
                        <img src="/svg/x2.svg" alt="x" onClick={onClose} className="hover:cursor-pointer absolute right-3 top-4 w-5"/>
                    </div>
                    {notepad.length === 0 ? (
                        <div className="text-center p-10">Tidak ada Memo</div>
                    ) : (
                        notepad.map((note) => (
                            <div key={note.id} className="flex justify-between bg-slate-100 py-3 px-3 border-b border-indigo-900">
                                <div>
                                <button onClick={() => onDetailNoteClick(note.id)}>{note.title}</button>
                                </div>
                                <img src="/svg/trashcan.svg" className="hover:cursor-pointer w-4" alt="sampah" onClick={() => handleDeleteNote(note.id)}></img>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-2 flex justify-end">
                    <button className="bg-indigo-900 text-white px-4 py-2 rounded-md text-sm" onClick={onAddNoteClick}>Add Note</button>
                </div>
            </div>
        </div>
    );
}

export default Note;
