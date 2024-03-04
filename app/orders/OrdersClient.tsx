"use client";

// import { Order, User } from "@prisma/client";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { formatPrice } from "@/utils/formatPrice";
// import Heading from "@/app/components/Heading";
// import Status from "@/app/components/Status";
// import {
//   MdAccessTimeFilled,
//   MdDeliveryDining,
//   MdDone,
//   MdRemoveRedEye,
// } from "react-icons/md";
// import ActionBtn from "@/app/components/ActionBtn";
// import { useCallback } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// import moment from "moment";

// interface OrdersClientProps {
//   Orders: ExtendedOrderType[];
// }
// type ExtendedOrderType = Order & {
//   user: User;
// };
// const OrdersClient: React.FC<OrdersClientProps> = ({ Orders }) => {
//   const router = useRouter();
//   let rows: any = [];
//   console;

//   if (Orders) {
//     rows = Orders.map((order) => {
//       return {
//         id: order.id,
//         customer: order.user.name,
//         amount: formatPrice(order.amount / 100),
//         paymentStatus: order.status,
//         date: moment(order.createdDate).fromNow(),
//         deliveryStatus: order.deliveryStatus,
//       };
//     });
//   }

//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 220 },
//     { field: "customer", headerName: "Customer Name", width: 130 },
//     {
//       field: "amount",
//       headerName: "Amount(INR)",
//       width: 130,
//       renderCell: (params) => {
//         return (
//           <div className="font-bold text-slate-800">{params.row.amount}</div>
//         );
//       },
//     },
//     {
//       field: "paymentStatus",
//       headerName: "Payment Status",
//       width: 130,
//       renderCell: (params) => {
//         return (
//           <div>
//             {params.row.paymentStatus === "pending" ? (
//               <Status
//                 text="pending"
//                 icon={MdAccessTimeFilled}
//                 bg="bg-slate-200"
//                 color="text-slate-700"
//               />
//             ) : params.row.paymentStatus === "completed" ? (
//               <Status
//                 text="completed"
//                 icon={MdDone}
//                 bg="bg-purple-200"
//                 color="text-purple-700"
//               />
//             ) : (
//               <></>
//             )}
//           </div>
//         );
//       },
//     },

//     {
//       field: "deliveryStatus",
//       headerName: "Delivery Status",
//       width: 130,
//       renderCell: (params) => {
//         return (
//           <div>
//             {params.row.deliveryStatus === "pending" ? (
//               <Status
//                 text="pending"
//                 icon={MdAccessTimeFilled}
//                 bg="bg-slate-200"
//                 color="text-slate-700"
//               />
//             ) : params.row.deliveryStatus === "dispatched" ? (
//               <Status
//                 text="dispatched"
//                 icon={MdDeliveryDining}
//                 bg="bg-purple-200"
//                 color="text-purple-700"
//               />
//             ) : params.row.deliveryStatus === "delivered" ? (
//               <Status
//                 text="delivered"
//                 icon={MdDeliveryDining}
//                 bg="bg-green-200"
//                 color="text-green-700"
//               />
//             ) : (
//               <></>
//             )}
//           </div>
//         );
//       },
//     },

//     {
//       field: "date",
//       headerName: "Date",
//       width: 130,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="flex justify-between gap-4 w-full">
//             <ActionBtn
//               icon={MdRemoveRedEye}
//               onclick={() => {
//                 router.push(`/order/${params.row.id}`);
//               }}
//             />
//           </div>
//         );
//       },
//     },
//   ];

 


//   return (
//     <div className="max-w-[1150p] mb-auto text-xl">
//       <div className="mb-4 mt-8">
//         <Heading title="Manage Orders" center />
//       </div>
//       <div style={{ height: 600, width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 10 },
//             },
//           }}
//           pageSizeOptions={[10, 20]}
//         />
//       </div>
//     </div>
//   );
// };

// export default OrdersClient;

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
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
