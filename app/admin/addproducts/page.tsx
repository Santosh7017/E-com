import Container from "@/app/components/Container"
import FormWrap from "@/app/components/FormWrap"
import AddProductForm from "./AddProductForm"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"
import { NextResponse } from "next/server"

const AddProducts = async () => {

    const currentUser = await getCurrentUser();
    if(!currentUser) return <NullData title="!!!Access denied" />;

    if(currentUser.role !== 'ADMIN'){
        return <NullData title="!!!Access denied" />
    }
  return (
    <div>
         <Container>
            <FormWrap>
                <AddProductForm />
            </FormWrap>
        </Container>
    </div>
  )
}

export default AddProducts