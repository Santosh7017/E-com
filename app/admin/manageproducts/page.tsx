import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {

  const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role != 'ADMIN'){
        return <NullData title="!!!Access denied" />
    }
  return (
    <div>ManageProducts</div>
  )
}

export default ManageProducts