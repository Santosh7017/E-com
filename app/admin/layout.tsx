import AdminNav from "../components/admin/AdminNav"

export const metadata = {
    title: "E-Com admin",
    description: 'E-com admin dashboard'
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <AdminNav />
        {children}
    </div>
  )
}

export default AdminLayout