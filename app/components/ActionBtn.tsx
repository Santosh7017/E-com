import { IconType } from "react-icons"

interface ActionBtnProps {
    icon: IconType;
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean
    tooltip?: string
}
const ActionBtn: React.FC<ActionBtnProps> = ({icon: Icon, onclick, disabled, tooltip}) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`flex items-center justify-center rounded cursor-pointer 
      w-[40px] h-[30px] text-slate-700 border border-slate-400 ${disabled && "opacity-50 cursor-not-allowed"}`}
      title={tooltip}
    >
      <Icon size={18}/>
    </button>
  )
}

export default ActionBtn