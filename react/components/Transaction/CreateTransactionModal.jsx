import React, { useState } from 'react';
import axios from 'axios';

const CreateTransactionModal = ({ isOpen, onClose, categoryId, token, onTransactionCreated }) => {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null; // Do not render modal if it's not open

    const handleCreateTransaction = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `http://localhost:8080/api/categories/${categoryId}/transactions`,
                {
                    amount: parseFloat(amount),
                    note,
                    transactionDate: new Date(transactionDate).getTime(), // Ensure this is the expected format
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Transaction Created');
            setAmount('');
            setNote('');
            setTransactionDate('');
            onClose(); // Close the modal after creating the transaction
            onTransactionCreated(); // Notify parent to refetch categories
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message); // Better error handling
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <form onSubmit={handleCreateTransaction}>
                    <h3>Create a New Transaction</h3>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label>Note:</label>
                    <input
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <label>Date:</label>
                    <input
                        type="date"
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Create Transaction</button>
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

export default CreateTransactionModal;
