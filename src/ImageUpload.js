import React from 'react'
import { useState } from 'react';
import { REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_PRESET } from './constants';
const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append(
            "upload_preset",
            REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        data.append("cloud_name", REACT_APP_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "Cloudinary-React");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
            setUrl(res.public_id);
        } catch (error) {
            console.log(error);
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = () => {
        };
      };
    return (
        <div>
            <input
                id="hidden-input"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
            />
            <button
                onClick={uploadImage}
                className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
                disabled={!image}
            >
                Upload now
            </button>
        </div>
    )
}

export default ImageUpload;