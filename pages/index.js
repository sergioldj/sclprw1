// pages/index.js
import { useEffect, useState } from 'react';
import Parse from '../lib/parseConfig';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const Items = Parse.Object.extend('Items');
      const query = new Parse.Query(Items);
      try {
        const results = await query.find();
        setItems(results);
      } catch (error) {
        console.error('Error retrieving items:', error);
      }
    };
    loadItems();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.get('title')}</strong> - {item.get('description')}
          </li>
        ))}
      </ul>
    </div>
  );
}