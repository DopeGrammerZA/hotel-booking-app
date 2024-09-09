import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirestoreExample = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    setData(querySnapshot.docs.map(doc => doc.data()));
  };

  const addItem = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'items'), { name: newItem });
    setNewItem('');
    fetchData(); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreExample;
