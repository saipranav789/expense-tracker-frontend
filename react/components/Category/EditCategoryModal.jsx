import React, { useState } from 'react';
import axios from 'axios';

const EditCategoryModal = ({ isOpen, onClose, category, token }) => {
    const [title, setTitle] = useState(category.title);
    const [description, setDescription] = useState(category.description);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8080/api/categories/${category.categoryId}`,
                { title, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onClose(); // Close the modal after successful edit
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <form onSubmit={handleSubmit}>
                    <h3>Edit Category</h3>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Update</button>
                    <button type="button" onClick={onClose} style={styles.button}>Close</button>
                    {error && <p style={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    input: {
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        margin: '5px',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default EditCategoryModal;
