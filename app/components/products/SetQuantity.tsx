"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

export const SetQuantity = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: SetQuantityProps) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold"> QUANTITY: </div>}
      <div className="flex gap-4 items-center text-base ">
        <button
          onClick={handleQuantityDecrease}
          className="border-[1.2px] border-slate-300 w-6"
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          onClick={handleQuantityIncrease}
          className="border-[1.2px] border-slate-300 w-6"
        >
          +
        </button>
      </div>
    </div>
  );
};
