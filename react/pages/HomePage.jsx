import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CreateCategory from '../components/Category/CreateCategory';
import CategoryList from '../components/Category/CategoryList';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  const token = user.data.token;

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryCreated = () => {
    fetchCategories(); // Refetch categories when a category is created
  };

  const handleTransactionCreated = () => {
    fetchCategories(); // Refetch categories when a transaction is created
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  // Calculate the total expenses
  const calculateTotalExpenses = () => {
    return categories.reduce((total, category) => total + category.totalExpense, 0);
  };

  return (
    <div>
      <h1>Welcome to the expense tracker</h1>
      <CreateCategory token={token} onCategoryCreated={handleCategoryCreated} />
      <h2>Total Expenses: ${calculateTotalExpenses()}</h2> 
      <CategoryList 
        categories={categories} 
        token={token} 
        onTransactionCreated={handleTransactionCreated} 
        refetchCategories={fetchCategories} // Pass refetchCategories
      />
    </div>
  );
};

export default HomePage;
