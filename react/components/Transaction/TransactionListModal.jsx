import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionListModal = ({ isOpen, onClose, categoryId, token }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchTransactions = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}/transactions`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setTransactions(response.data);
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                }
            };

            fetchTransactions();
        }
    }, [isOpen, categoryId, token]);

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <button onClick={onClose} style={modalStyles.closeButton}>X</button>
                <h2>Transactions</h2>
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <div key={transaction.transactionId} style={modalStyles.transactionCard}>
                            <p><strong>Amount:</strong> ${transaction.amount}</p>
                            <p><strong>Note:</strong> {transaction.note}</p>
                            <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No transactions available for this category.</p>
                )}
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '80%',
        maxWidth: '600px',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    },
    transactionCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
    },
};

export default TransactionListModal;
