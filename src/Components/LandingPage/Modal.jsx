const Modal = ({ show, onClose, data }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded shadow-lg w-3/4 md:w-1/2">
          <button className="float-right text-gray-700" onClick={onClose}>X</button>
          <h2 className="text-xl font-bold mb-4">Detail for Date: {data.No}</h2>
          <div>
            <h3 className="font-semibold">To Do List:</h3>
            <p>{data.todolist}</p>
          </div>
          <div>
            <h3 className="font-semibold">Activity:</h3>
            <p>{data.Activity}</p>
          </div>
          <div>
            <h3 className="font-semibold">Consume:</h3>
            <p>{data.Consume}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;