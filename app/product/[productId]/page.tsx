import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductsById from "@/actions/getproductsById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
interface IPrams {
  productId?: string;
}

const Product = async ({ params }: { params: IPrams }) => {
  const product = await getProductsById(params);
  const user = await getCurrentUser();

  if (!product) {
    return (
      <NullData title="Product is not available! Please try again after some" />
    );
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
