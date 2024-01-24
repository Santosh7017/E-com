import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role != 'ADMIN'){
        return <NullData title="!!!Access denied" />
    }
  return (
    <div>Admin</div>
  )
}

export default Admin