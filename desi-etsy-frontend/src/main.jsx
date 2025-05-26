import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ✅ Hamara CartProvider import kar rahe hain (ye context banata hai)
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 🔄 CartProvider ke andar App ko wrap kiya — taaki cart ka data global ho */}
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
