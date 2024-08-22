import { useState } from 'react';
import axios from 'axios';

const CreateTransaction = ({ categoryId, token }) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [error, setError] = useState('');

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/categories/${categoryId}/transactions`,
        {
          amount,
          note,
          transactionDate: new Date(transactionDate).getTime(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Transaction Created:', response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleCreateTransaction}>
      <h3>Create a New Transaction</h3>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <label>Note:</label>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
      />
      <label>Date:</label>
      <input
        type="date"
        value={transactionDate}
        onChange={(e) => setTransactionDate(e.target.value)}
        required
      />
      <button type="submit">Create Transaction</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CreateTransaction;
