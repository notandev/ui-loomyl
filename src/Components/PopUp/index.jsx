function PopUp({ message, title, action}) {
    return (
        <div className="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center">
            <div className="flex flex-col">
                <div className="bg-white rounded-t-lg w-full h-full flex flex-col justify-center items-center px-16">
                    <div className="-mt-10 rounded-full bg-[#14116E] w-20 h-20 flex justify-center items-center border-4 border-[#8FC1FF]">
                        <img src="../svg/checklist.svg" alt="checklist" className="w-10 h-10 mx-auto" />
                    </div>
                    <p className="font-bold text-xl pt-2">{title}</p>
                    <p className="text-sm pb-5 pt-6">{message}</p>

                </div>
                <div className="p-3 bg-[#F1F5F8] rounded-b-lg">
                    <button onClick={action} className="font-bold text-white py-2 rounded-md bg-[#14116E] w-full">OK</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp;