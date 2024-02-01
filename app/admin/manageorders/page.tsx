import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";

const ManageOrders = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser) return <NullData title="!!!Access denied" />;

  if(currentUser.role !== 'ADMIN'){
      return <NullData title="!!!Access denied" />
  }
  const orders = await getOrders();

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient
            Orders={orders}
          
        />
      </Container>
    </div>
  );
};

export default ManageOrders;
