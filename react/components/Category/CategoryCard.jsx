import React, { useState } from 'react';
import axios from 'axios';
import CreateTransactionModal from '../Transaction/CreateTransactionModal';
import TransactionListModal from '../Transaction/TransactionListModal';
import EditCategoryModal from './EditCategoryModal'; // Import the EditCategoryModal

const CategoryCard = ({ category, token, onTransactionCreated, refetchCategories }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);
    const openTransactionsModal = () => setIsTransactionsModalOpen(true);
    const closeTransactionsModal = () => setIsTransactionsModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true); // Open edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        refetchCategories(); // Refetch categories when modal closes
    };

    const deleteCategory = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/categories/${category.categoryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            refetchCategories(); // Refetch categories after successful deletion
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div style={cardStyles.card}>
            <h3>{category.title}</h3>
            <p>Total Transactions: ${category.totalExpense}</p>
            <button onClick={openCreateModal} style={cardStyles.button}>Create Transaction</button>
            <button onClick={openTransactionsModal} style={cardStyles.viewButton}>View Transactions</button>
            <button onClick={openEditModal} style={cardStyles.editButton}>✏️ Edit</button> {/* Edit button */}
            <button onClick={deleteCategory} style={cardStyles.deleteButton}>🗑️ Delete</button> {/* Delete button */}
            <CreateTransactionModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                categoryId={category.categoryId}
                token={token}
                onTransactionCreated={onTransactionCreated}
            />
            <TransactionListModal
                isOpen={isTransactionsModalOpen}
                onClose={closeTransactionsModal}
                categoryId={category.categoryId}
                token={token}
            />
            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                category={category}
                token={token}
            />
        </div>
    );
};

const cardStyles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        width: '300px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        marginTop: '10px',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#28a745',
        color: 'white',
        cursor: 'pointer',
    },
    viewButton: {
        marginTop: '10px',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
    editButton: {
        marginTop: '10px',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#ffc107',
        color: 'white',
        cursor: 'pointer',
    },
    deleteButton: {
        marginTop: '10px',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#dc3545',
        color: 'white',
        cursor: 'pointer',
    },
};

export default CategoryCard;
