import React, { useState } from "react";

const ProductItem = ({
  product,
  layout,
  cartQuantity,
  inventory,
  addToCart,
  removeFromCart,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <>
      {layout === "grid" ? (
        <div className={`product-item ${layout}`}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Inventory: {inventory}</p>
          <p>Purchase Limit: {product?.purchaseLimit} per order</p>
          {product.variants && (
            <div className="variant-buttons">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant)}
                  className={selectedVariant === variant ? "selected" : ""}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          )}
          {selectedVariant && (
            <div>
              <p>Selected Variant: {selectedVariant.name}</p>
            </div>
          )}
          {inventory === 0 ? (
            <p>Out of Stock</p>
          ) : (
            <div>
              <button
                onClick={() => addToCart(product.id, selectedVariant)}
                disabled={product?.purchaseLimit === cartQuantity}
              >
                Add to Cart
              </button>
              {cartQuantity > 0 && (
                <div>
                  <button
                    onClick={() => removeFromCart(product.id, selectedVariant)}
                  >
                    Remove from Cart
                  </button>
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
              {product.variants && (
                <div className="variant-buttons">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={selectedVariant === variant ? "selected" : ""}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              )}
              {selectedVariant && (
                <div>
                  <p>Selected Variant: {selectedVariant.name}</p>
                </div>
              )}
              {inventory === 0 ? (
                <p>Out of Stock</p>
              ) : (
                <div>
                  <button
                    onClick={() => addToCart(product.id, selectedVariant)}
                    disabled={product?.purchaseLimit === cartQuantity}
                  >
                    Add to Cart
                  </button>
                  {cartQuantity > 0 && (
                    <div>
                      <button
                        onClick={() =>
                          removeFromCart(product.id, selectedVariant)
                        }
                      >
                        Remove from Cart
                      </button>
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
