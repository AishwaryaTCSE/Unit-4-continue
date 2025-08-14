import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 15000 },
    { id: 3, name: 'Headphones', price: 2000 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛒 Shopping Cart</h1>

      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} style={{ marginBottom: '10px' }}>
          {product.name} - ₹{product.price}
          <button
            onClick={() => dispatch(addItem(product))}
            style={{ marginLeft: '10px' }}
          >
            Add
          </button>
        </div>
      ))}

      <h2>Cart Items</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        items.map(item => (
          <div key={item.id}>
            {item.name} - ₹{item.price}
            <button
              onClick={() => dispatch(removeItem(item.id))}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default App;
