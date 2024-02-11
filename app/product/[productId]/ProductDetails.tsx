"use client";

import Button from "@/app/components/Button";
import ProductImages from "@/app/components/products/ProductImages";
import SetColor from "@/app/components/products/SetColor";
import { SetQuantity } from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsprops {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const Horizontal = () => {
  return <hr className="w-[30%] my-2 " />;
};

const ProductDetails: React.FC<ProductDetailsprops> = ({ product }) => {
  const { handleAddProductCart, cartProducts } = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartProduct.selectedImg]
  );

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProduct]);

  
  const router = useRouter();

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct]);

  return (
    <div
      className="grid grid-cols-1 
    md:grid-cols-2 gap-12
    "
    >
      <ProductImages
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />

      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly precision={0.5} />

          <div>{product.reviews.rating} reviews</div>
        </div>

        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <div>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span> Checkout from Cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outlined
                onclick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <SetColor
              images={product.images}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityDecrease={handleQuantityDecrease}
              handleQuantityIncrease={handleQuantityIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              {product.inStock?(<Button
                label="Add To Cart"
                onclick={() => handleAddProductCart(cartProduct)}
              />):(<Button
                label="Out of Stock"
                disabled
              />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
