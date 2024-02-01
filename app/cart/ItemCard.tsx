"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncate";
import Image from "next/image";
import { SetQuantity } from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemCardProps {
  item: CartProductType;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const {
    handleRemoveFromCart,
    handleCartProductQuantityInc,
    handleCartProductQuantityDec,
  } = useCart();
  return (
    <div
      className="
    grid
    grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px]
    py-4 items-center
    "
    >
      <div
        className="col-span-2 justify-self-start
        flex gap-2 md:gap-4"
      >
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between ">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="font-semibold justify-self-center">
        {formatPrice(item.price)}
      </div>
      <div className="font-semibold justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQuantityIncrease={() => handleCartProductQuantityInc(item)}
          handleQuantityDecrease={() => handleCartProductQuantityDec(item)}
        />
      </div>
      <div className="font-semibold justify-self-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemCard;
