

interface MenuItemsProps {
    children : React.ReactNode;
    onclick: () => void
}
const MenuItems: React.FC<MenuItemsProps> = ({children, onclick}) => {
  return (
    <div onClick={onclick} className="px-4 py-3 hover:bg-neutral-100 transition">
        {children}
    </div>
  )
}

export default MenuItems