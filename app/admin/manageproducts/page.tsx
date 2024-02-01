import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";

const ManageProducts = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) return <NullData title="!!!Access denied" />;

  if(currentUser.role !== 'ADMIN'){
      return <NullData title="!!!Access denied" />
  }
  const products = await getProducts({ category: null });

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient
          products={
            products as ({
              id: string;
              name: string;
              description: string;
              price: number;
              brand: string;
              category: string;
              inStock: boolean;
            } & {
              images: { color: string; colorCode: string; image: string }[];
            })[]
          }
          // products={products}
        />
      </Container>
    </div>
  );
};

export default ManageProducts;
