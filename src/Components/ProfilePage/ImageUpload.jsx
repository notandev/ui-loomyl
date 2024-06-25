import { useState } from 'react';
import { postImage, putImage } from '../../api/image';

const ImageUploadPopup = ({ onClose, onUpload, ada }) => {
    const [file, setFile] = useState(null);
    const id = ada
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


    const handleSubmit = (e) => {
        console.log('tes');
        const formData = new FormData();
        formData.append('image', file);

        if (ada !== null) {
            console.log(ada);
            putImage(id, formData).then((response) => {
                console.log('Image update successfully:', response);
            }
            ).catch(error => {
                console.error('There was an error uploading the image!', error);
            })
        } else {
            postImage(formData).then((response) => {
                console.log('Image uploaded successfully:', response.data);
            }).catch(error => {
                console.error('There was an error uploading the image!', error);
            })
        }
        onUpload();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-5 rounded">
                <h2 className="text-xl mb-4">Upload Image</h2>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImageUploadPopup;
