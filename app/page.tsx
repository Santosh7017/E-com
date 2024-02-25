export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/footer/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomePageProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomePageProps) {
  // const products = await getProducts(searchParams);
  // if(products?.length === 0){
  //     return <NullData title="!! No Products Found. Click all To Clear Filter" />
  // }
  let products: any[] = [];
  try {
    products = (await getProducts(searchParams)) || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    products = [];
  }
  if (!products) {
    products = [];
  }

  if (products.length === 0) {
    return <NullData title="!! No Products Found. Click all To Clear Filter" />;
  }

  //shuffler products
  function shuffler(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffelProducts = shuffler(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-8"> */}
        <div className="  mx-auto px-4">
          <div className="w-full pb-16">
            <div className="px-2 flex flex-wrap  justify-start sm:justify-center" >
              {shuffelProducts.map((product: any) => {
                return <ProductCard key={product.id} data={product} />;
              })}
            </div>
          </div>
        </div>
        {/* </div> */}
      </Container>
    </div>
  );
}
