import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CategoryPageWithTransactions = ({ categoryId }) => {
    const [category, setCategory] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                // Fetch category details
                const categoryResponse = await axios.get(`http://localhost:8080/api/categories/${categoryId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.data.token}`
                    }
                });
                setCategory(categoryResponse.data);

                // Fetch transactions related to the category
                const transactionsResponse = await axios.get(`http://localhost:8080/api/categories/${categoryId}/transactions`, {
                    headers: {
                        'Authorization': `Bearer ${user.data.token}`
                    }
                });
                setTransactions(transactionsResponse.data);
            } catch (error) {
                console.error('Error fetching category or transactions:', error);
            }
        };

        fetchCategoryDetails();
    }, [categoryId, user]);

    const calculateTotalExpense = () => {
        return transactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

    return (
        <div style={pageStyles.container}>
            {category && (
                <div style={pageStyles.header}>
                    <h2>{category.name}</h2>
                    <p>Total Expense: ${calculateTotalExpense()}</p>
                </div>
            )}
            <div style={pageStyles.transactions}>
                {transactions.length > 0 ? (
                    transactions.map(transaction => (
                        <div key={transaction.transactionId} style={pageStyles.transactionCard}>
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

const pageStyles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    header: {
        marginBottom: '20px',
    },
    transactions: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '10px',
    },
    transactionCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

export default CategoryPageWithTransactions;
