// components/PricingForm.tsx
import { useState } from 'react';

const PricingForm = () => {
  const [region, setRegion] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region, item, price }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('Price submitted:', data);
      } else {
        console.error('Price submission failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={region} 
        onChange={(e) => setRegion(e.target.value)} 
        placeholder="Region" 
        required 
      />
      <input 
        type="text" 
        value={item} 
        onChange={(e) => setItem(e.target.value)} 
        placeholder="Item" 
        required 
      />
      <input 
        type="number" 
        value={price} 
        onChange={(e) => setPrice(parseFloat(e.target.value))} 
        placeholder="Price" 
        required 
      />
      <button type="submit">Submit Price</button>
    </form>
  );
};

export default PricingForm;
