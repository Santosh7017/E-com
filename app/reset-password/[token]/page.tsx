import Container from '@/app/components/Container'
import FormWrap from '@/app/components/FormWrap'
import ResetForm from './ResetForm'
interface Params {
  token: string
}
interface IParams {
  params: Params
}

const ResetPasswordPage = (params: IParams) => {
  
  return (
   <Container>
    <FormWrap>
      <ResetForm token={params.params.token}/>
    </FormWrap>
   </Container>
  )
}

export default ResetPasswordPage
