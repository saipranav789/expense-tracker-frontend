import { useState } from 'react';
import axios from 'axios';

const CreateCategory = ({ token, onCategoryCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:8080/api/categories',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Category Created');
      onCategoryCreated(); // Notify parent to refetch categories
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleCreateCategory}>
      <h3>Create a New Category</h3>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Category</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CreateCategory;
