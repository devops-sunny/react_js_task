import React, { useState } from "react";

const CouponInput = ({ applyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };

  return (
    <div className="coupon-input">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button onClick={handleApplyCoupon}>Apply Coupon</button>
    </div>
  );
};

export default CouponInput;
