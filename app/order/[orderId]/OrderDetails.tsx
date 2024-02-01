"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  Order: Order;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ Order }) => {
  return (
    <div
      className=" m-auto 
    flex flex-col gap-2 left-1"
    >
      <div className="mt-8 ">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {Order.id}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(Order.amount)} </span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Payment Status: </div>
        <div>
          {Order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="test-slate-700"
            />
          ) : Order.status === "completed" ? (
            <Status
              text="completed"
              icon={MdDone}
              bg="bg-green-200"
              color="test-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div>Delivery Status: </div>
        <div>
          {Order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="test-slate-700"
            />
          ) : Order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="test-purple-700"
            />
          ) : Order.deliveryStatus === "delivered" ? (
            <Status
              text="dispatched"
              icon={MdDone}
              bg="bg-green-200"
              color="test-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
     
        Date: {moment(Order.createdDate).fromNow()}
        <div>
          <h2 className="font-semibold mt-4 mb-2">Products ordered </h2>
          <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className=" justify-self-center">PRICE</div>
          <div className=" justify-self-center">QTY</div>
          <div className=" justify-self-end">Total</div>
        </div>
        {Order.products && Order.products.map((item) => {
          return <OrderItem key={item.id} item= {item}></OrderItem>
        })}
        </div>
    </div>
  );
};

export default OrderDetails;
