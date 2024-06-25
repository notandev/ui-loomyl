import { useState } from "react";
import { createComunity } from "../../api/comunity";

const FormCommunity = ({ show, onClose , upload}) => {

    const [content, setContent] = useState("");

    const onSubmit = () => {
        console.log("ini konten",content);
        const payload = {
            content
        }
        createComunity(payload).then((res) => {
            console.log(res);
            onClose();
            upload( )
        }).catch((err) => {
            console.log(err);
        });
    }

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white rounded-xl pt-20 pb-10 px-20 relative">
                <img src="/svg/x.svg" alt="x" className="hover:cursor-pointer absolute top-0 right-0 p-8"/>
                <div className="bg-slate-100 overflow-hidden rounded-md border border-slate-200 w-[500px] h-[300px] flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col">
                        <div className="">
                            <textarea type="text" className="w-full py-3 bg-slate-100 focus:outline-none h-80 px-3" placeholder="Ketik sesuatu yang anda pikirkan....." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className="p-2 flex justify-end">
                    <div>

                    </div>
                    <button className="bg-indigo-900 text-white px-12 py-2 rounded-md text-sm" onClick={onSubmit}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default FormCommunity