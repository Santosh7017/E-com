"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncate";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PdoductCardProps {
  data: any;
}


// ! design 2
const ProductCard = ({ data }: PdoductCardProps) => {
  const router = useRouter();
  const { handleAddProductCart, cartProducts } = useCart();
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div>
      <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <div
          className="relative mx-3 mt-3 flex h-60
           overflow-hidden rounded-xl transition
           cursor-pointer
           "
          onClick={()=> router.push(`/product/${data.id}`)}
        >
          <Image
            fill
            className="object-cover"
            src={data.images[0].image}
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full  px-2 text-center text-sm font-medium text-white">
            <Rating
              value={productRating}
              readOnly
              precision={0.5}
              className=""
            />
          </span>
        </div>
        <div className="mt-4 px-5 pb-5">
          <div onClick={()=> router.push(`/product/${data.id}`)} 
          className="cursor-pointer"
          >
            <h5 className="text-xl tracking-tight text-slate-900">
              {truncateText(data.name)}
            </h5>
          </div>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                {formatPrice(data.price)}
              </span>
              <span className="text-sm text-slate-900 line-through">
                {formatPrice(data.price + 100)}
              </span>
            </p>
            <div className="flex items-center">
            </div>
          </div>
          <Link
            href={`/product/${data.id}`}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            More Info
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
