import React from 'react';
import CategoryCard from './CategoryCard';

const CategoryList = ({ categories, token, onTransactionCreated, refetchCategories }) => {
  return (
    <div style={styles.list}>
      {categories.map(category => (
        <CategoryCard 
          key={category.categoryId} 
          category={category} 
          token={token} 
          onTransactionCreated={onTransactionCreated} 
          refetchCategories={refetchCategories} // Pass refetchCategories callback
        />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  }
};

export default CategoryList;
