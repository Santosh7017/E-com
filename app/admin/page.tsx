import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <NullData title="!!!Access denied" />;

  if (currentUser.role !== "ADMIN") {
    return <NullData title="!!!Access denied" />;
  }

  const products = await getProducts({ category: null }) ;
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
 
    if(!products  ){
      return null;
    }

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData}/>
        </div>
      </Container>
    </div>
  );
};

export default Admin;
