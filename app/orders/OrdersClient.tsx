"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";

import moment from "moment";

interface OrdersClientProps {
  Orders: ExtendedOrderType[];
}

type ExtendedOrderType = Order & {
  user: User;
};

const OrdersClient: React.FC<OrdersClientProps> = ({ Orders }) => {
  const router = useRouter();
   
  const rows = Orders?.map((order) => ({
    id: order.id,
    customer: order.user.name,
    amount: formatPrice(order.amount / 100),
    paymentStatus: order.status,
    date: moment(order.createdDate).fromNow(),
    deliveryStatus: order.deliveryStatus,
  })) || [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "customer", headerName: "Customer Name", width: 180 },
    { field: "amount", headerName: "Amount (INR)", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: ({ row }) => (
        <Status
          text={row.paymentStatus}
          icon={row.paymentStatus === "pending" ? MdAccessTimeFilled : MdDone}
          bg={row.paymentStatus === "pending" ? "bg-slate-200" : "bg-purple-200"}
          color={row.paymentStatus === "pending" ? "text-slate-700" : "text-purple-700"}
        />
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 180,
      renderCell: ({ row }) => (
        <Status
          text={row.deliveryStatus}
          icon={
            row.deliveryStatus === "pending" ? MdAccessTimeFilled : row.deliveryStatus === "dispatched" ? MdDeliveryDining : MdDone
          }
          bg={
            row.deliveryStatus === "pending"
              ? "bg-slate-200"
              : row.deliveryStatus === "dispatched"
              ? "bg-purple-200"
              : "bg-green-200"
          }
          color={
            row.deliveryStatus === "pending"
              ? "text-slate-700"
              : row.deliveryStatus === "dispatched"
              ? "text-purple-700"
              : "text-green-700"
          }
        />
      ),
    },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: ({ row }) => (
        <ActionBtn
          icon={MdRemoveRedEye}
          onclick={() => {
            router.push(`/order/${row.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-4">
      <Heading title="Manage Orders" center />
      <div className="mt-4" style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
    </div>
  );
};

export default OrdersClient;
