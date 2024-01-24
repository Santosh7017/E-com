import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const Manageorders = async () => {

  const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role != 'ADMIN'){
        return <NullData title="!!!Access denied" />
    }
  return (
    <div>Manageorders</div>
  )
}

export default Manageorders