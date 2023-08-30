import React, { useState } from "react";

const ProductItem = ({ product,layout, cartQuantity , inventory, addToCart, removeFromCart }) => {
 return (
    <>
      {layout === "grid" ? (
        <div className="product-item">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Inventory: {inventory}</p>
        {inventory === 0 ? (
          <p>Out of Stock</p>
        ) : (
          <div>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            {cartQuantity > 0 && (
              <div>
                <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                <span>Quantity: {cartQuantity}</span>
              </div>
            )}
          </div>
        )}
      </div>
      ) : (
        <table className="customers">
          <tr>
            <th>Price: {product.name}</th>
            <th>Inventory: {inventory} </th>
            <th>Purchase Limit: {product?.purchaseLimit} per order</th>
            <th>
            {inventory === 0 ? (
          <p>Out of Stock</p>
        ) : (
          <div>
            <button onClick={() => addToCart(product.id)} disabled={product?.purchaseLimit === cartQuantity && true}>Add to Cart</button>
            {cartQuantity > 0 && (
              <div>
                <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                <span>Quantity: {cartQuantity}</span>
              </div>
            )}
          </div>
        )}
            </th>
          </tr>
        </table>
      )}
    </>
  );
};

export default ProductItem;




