import React, { useState } from 'react';
import axios from 'axios';

const Converter = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file before converting.");
      return;
    }

    setIsConverting(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
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
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Conversion failed. Please check the file format.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>OpenAPI → Postman Converter</h2>

      <div style={styles.card}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".json,.yaml,.yml"
          style={styles.fileInput}
        />

        {file && (
          <p style={styles.fileInfo}>
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleFileUpload} style={styles.button} disabled={isConverting}>
          {isConverting ? 'Converting...' : 'Convert & Download'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    padding: '40px',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    marginBottom: '30px',
  },
  card: {
    display: 'inline-block',
    backgroundColor: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    minWidth: '350px',
  },
  fileInput: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    cursor: 'pointer',
  },
  fileInfo: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
};

export default Converter;
