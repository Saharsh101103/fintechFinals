// components/KYCForm.tsx
import { useState } from 'react';

const KYCForm = ({ userId }: { userId: string }) => {
  const [document, setDocument] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, document }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('KYC submitted:', data);
      } else {
        console.error('KYC submission failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={document} 
        onChange={(e) => setDocument(e.target.value)} 
        placeholder="KYC Document URL" 
        required 
      />
      <button type="submit">Submit KYC</button>
    </form>
  );
};

export default KYCForm;
