import AdminNav from "../components/admin/AdminNav"

export const metadata = {
    title: "Digi-Shop admin",
    description: 'Digi-Shop admin dashboard'
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