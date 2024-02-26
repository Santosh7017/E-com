"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncate";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLabelImportant } from "react-icons/md";

interface PdoductCardProps {
  data: any;
}

const ProductCard = ({ data }: PdoductCardProps) => {
  const router = useRouter();
  const { handleAddProductCart, cartProducts } = useCart();
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  return (
    <div className="w-auto m-5 relative group mb-4 shadow-md ">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div className=" flex justify-center md:min-h-56 sm:min-h-32" >
          <Image
            className="w-full h-full max-h-56 max-w-56"
            src={data.images[0].image}
            alt="Product"
            
            height={100}
            width={200}
            quality={100}
          />
        </div>
        <div className="w-full h-24 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              onClick={() => router.push(`/product/${data.id}`)}
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
        <span className="absolute top-0 left-0 m-2 rounded-full  px-2 text-center text-sm font-medium text-white">
        <Rating  value={productRating} readOnly precision={0.5} className="" />
          
        </span>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <p className="text-[#767676] text-[14px]"> {data.category}</p>
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold mr-2">
            {truncateText(data.name)}
          </h2>
          <p className="text-[#767676] text-[14px]">
            {" "}
            {formatPrice(data.price)}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;
