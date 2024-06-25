const PopUpCalendar = ({ show, onClose, date, data }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-20" onClick={onClose}>
            <div className="bg-white rounded-xl pt-20 pb-10 px-20 relative">
                <img src="/svg/x.svg" alt="x" className="hover:cursor-pointer absolute top-0 right-0 p-8" onClick={onClose} />
                <h2>Detail for Date: {date}</h2>
                {data && data.length > 0 ? (
                    data.map(item => (
                        <div key={item.No}>
                            <div className="w-[60%] py-5">
                                <p className="text-xl ">To Do</p>
                                <p>{item.todolist}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="col-span-1">
                                    <p className="text-xl ">Activity</p>
                                    <p className="">{item.Activity}</p>
                                </div>
                                <div className="col-span-1">
                                    <p className="text-xl ">Consume</p>
                                    <p className="">{item.Consume}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data available for this date.</p>
                )}
            </div>
        </div>
    );
};

export default PopUpCalendar;