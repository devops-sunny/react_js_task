
import React, { useEffect, useState } from 'react';
import productData from '../Data/productData';
import InventoryData from '../Data/InventoryData';
import ProductItem from './ProductItem';
import ProductLists from './Additionaltasks/ProductLists';

const ProductList = () => {
  const [layout, setLayout] = useState('table');
  const [cart, setCart] = useState({});
  const [inventory, setInventory] = useState(InventoryData);

   useEffect(() => {
    const storedLayout = localStorage.getItem('layoutPreference');
    if (storedLayout) {
      setLayout(storedLayout);  
    }
  }, []);


  const addToCart = (productId) => {
    const updatedCart = { ...cart };
    updatedCart[productId] = (updatedCart[productId] || 0) + 1;
    setCart(updatedCart);
    localStorage.setItem('updatedCart', JSON.stringify(updatedCart));
    const updatedInventory = { ...inventory };
    updatedInventory[productId]--;
    setInventory(updatedInventory);
    localStorage.setItem('updatedInventory',  JSON.stringify(updatedInventory));
  };

  const removeFromCart = (productId) => {
    if (cart[productId]) {
      const updatedCart = { ...cart };
      updatedCart[productId]--;
      if (updatedCart[productId] === 0) {
        delete updatedCart[productId];
      }
      setCart(updatedCart);
      localStorage.setItem('updatedCart', JSON.stringify(updatedCart));
      const updatedInventory = { ...inventory };
      updatedInventory[productId]++;
      setInventory(updatedInventory);
      localStorage.setItem('updatedInventory',  JSON.stringify(updatedInventory));
    }
  };

  return (
    <>
    <div className="product-list-container">
      <h1>Overview task</h1>
      <div className="layout-switch">
        <label> <b>Layout:</b></label>
        <select value={layout} onChange={(e) =>  { e.preventDefault(); localStorage.setItem('layoutPreference', e.target.value); setLayout(e.target.value)}}>
          <option value="table">Table View</option>
          <option value="grid">Grid View</option>
        </select>
      </div>
      <div className={`product-list`}>
        {productData.map((product) => (
          <ProductItem key={product.id} layout={layout} product={product} 
          cartQuantity={cart[product.id] || 0}
          inventory={inventory[product.id]}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
        ))}
      </div>
      <div>
       <b>cart</b>
        <ul>
          {Object.keys(cart).map((productId) => (
            <li key={productId}>
              {productData.find((product) => product.id === parseInt(productId)).name} -{' '}
              {cart[productId]}
              <button onClick={() => removeFromCart(productId)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <hr/>
      <h1>Additional tasks (Perform any one of below)</h1>
      <ProductLists />
    </div>
    </>
  
  );
};

export default ProductList;
