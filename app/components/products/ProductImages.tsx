"use client";

import { CartProductType, SelectedImgType } from "@/app/product/[productid]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
    cartProduct: CartProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void
}


const ProductImages = ({cartProduct, product, handleColorSelect}: ProductImageProps) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full 
    max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4 
        cursor-pointer border h-full max-h max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            {
                product.images.map((image: SelectedImgType) => {
                    return(
                        <div key={image.color} onClick={() => handleColorSelect(image)}
                        className={`relative w-[80%] aspect-square rounded border-teal-300 
                        ${cartProduct.selectedImg.color === image.color? 'border-[1.5px]': 'border-none' }
                        `}
                        >
                    <Image 
                    className="object-contain"
                    src={image.image} 
                    alt={image.color} 
                    fill  
                    
                    />
                    
                    </div>
                    )
                })
            }
        </div>
        <div className="col-span-5 relative aspect-square">
                <Image 
                fill
                src={cartProduct.selectedImg.image}
                className=" w-full h-full object-contain 
                max-h-[500px] min-h-[300px] sm:min-h-[400px]"
                alt={cartProduct.name}
                />
        </div>
    </div>
  )
}

export default ProductImages