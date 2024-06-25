import { useEffect, useState } from "react";
import { getNotepadById } from "../../api/notepad";

const DetailNote = ({ id, onClose }) => {
    const [note, setNote] = useState({});

    useEffect(() => {
        if (id) {
            getNotepadById(id).then((res) => {
                console.log(res.data.data[0].title);
                setNote(res.data.data[0]);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [id]);

    return (
        <div className="fixed inset-0 flex bg-black bg-opacity-50 justify-center items-center" onClick={onClose}>
            <div className="bg-white overflow-hidden relative rounded-md border border-indigo-900 w-96 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
                <img onClick={onClose} src="/svg/arrowBack.svg" alt="arrow back" className="hover:cursor-pointer absolute top-0 left-0 w-6 mt-3 ml-3" />
                <div className="flex flex-col ">
                    <p className="w-full focus:outline-none text-center py-4 px-3">{note.title}</p>
                    <p className="w-full px-8 pt-5 focus:outline-none h-80">{note.content}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailNote;
