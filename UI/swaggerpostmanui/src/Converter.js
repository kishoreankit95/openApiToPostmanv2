import React, { useState } from 'react';
import axios from 'axios';

const Converter = () => {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleFileUpload = async () => {
        if(!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try{
            const response = await axios.post('http://localhost:3001/convert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'postman-collection.json');
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        }
        catch(error){
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleFileUpload}>Convert</button>
        </div>
  )
}

export default Converter