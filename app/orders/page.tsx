import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();


  if (!currentUser ) {
    return <NullData title="!!!Access denied" />;
  }
  const orders = await getOrdersByUserId(currentUser.id);
  if(!orders) {
    return <NullData title="No Orders Yet" />;
  }

  return (
    <div className="pt-8">
      <Container>
      <OrdersClient Orders={orders}/>
      </Container>
    </div>
  );
};

export default Orders;
