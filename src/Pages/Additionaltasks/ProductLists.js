import React, { useEffect, useState } from 'react';
import productData from '../../Data/productData';
import InventoryData from '../../Data/InventoryData';
import ProductItem from './ProductItem';
import couponsData from '../../Data/CouponData';
import CouponInput from './CouponInput';

const ProductLists = () => {
  const [layout, setLayout] = useState('table');
  const [cart, setCart] = useState({});
  const [inventory, setInventory] = useState(InventoryData);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const storedLayout = localStorage.getItem('layoutPreference');
    if (storedLayout) {
      setLayout(storedLayout);
    }
  }, []);

  const addToCart = (productId, variant) => {
    const updatedCart = { ...cart };
    const cartItemKey = variant ? `${productId}-${variant.id}` : productId.toString();
    updatedCart[cartItemKey] = (updatedCart[cartItemKey] || 0) + 1;
    setCart(updatedCart);

    const updatedInventory = { ...inventory };
    updatedInventory[productId]--;
    setInventory(updatedInventory);
  };

  const removeFromCart = (productId, variant) => {
    const cartItemKey = variant ? `${productId}-${variant.id}` : productId.toString();
    if (cart[cartItemKey]) {
      const updatedCart = { ...cart };
      updatedCart[cartItemKey]--;
      if (updatedCart[cartItemKey] === 0) {
        delete updatedCart[cartItemKey];
      }
      setCart(updatedCart);

      const updatedInventory = { ...inventory };
      updatedInventory[productId]++;
      setInventory(updatedInventory);
    }
  };

  const applyCoupon = (couponCode) => {
    const coupon = couponsData.find((coupon) => coupon.code === couponCode);
    if (coupon) {
      const discountPercentage = coupon.discountPercentage;
      const discountAmount = (cartTotal * discountPercentage) / 100;
      const discountedTotal = cartTotal - discountAmount;
      console.log("discountedTotal",discountAmount)
      setCartTotal(discountedTotal);
    }
  };
  

  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach((cartItemKey) => {
      const [productId, variantId] = cartItemKey.split('-');
      const product = productData.find((p) => p.id.toString() === productId);
      const variant = product.variants.find((v) => v.id.toString() === variantId);
      total += product.price * cart[cartItemKey];
    });
    setCartTotal(total);
  }, [cart]);

  return (
    <div className="product-list-container">
      <div className="layout-switch">
        <label><b>Layout:</b></label>
        <select
          value={layout}
          onChange={(e) => {
            e.preventDefault();
            localStorage.setItem('layoutPreference', e.target.value);
            setLayout(e.target.value);
          }}
        >
          <option value="table">Table View</option>
          <option value="grid">Grid View</option>
        </select>
      </div>
      <CouponInput applyCoupon={applyCoupon} />
      <div className={`product-list ${layout}`}>
        {productData.map((product) => (
          <ProductItem
            key={product.id}
            layout={layout}
            product={product}
            cartQuantity={cart[product.id] || 0}
            inventory={inventory[product.id]}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
      <div className="cart">
        <b>Cart</b>
        <ul>
          {Object.keys(cart).map((cartItemKey) => {
            const [productId, variantId] = cartItemKey.split('-');
            const product = productData.find((p) => p.id.toString() === productId);
            const variant = product.variants.find((v) => v.id.toString() === variantId);
            return (
              <li key={cartItemKey}>
                {product.name} {variant && `- ${variant.name}`} - {cart[cartItemKey]}
                <button onClick={() => removeFromCart(productId, variant)}>Remove</button>
              </li>
            );
          })}
        </ul>
        <p>Total: ${cartTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductLists;
