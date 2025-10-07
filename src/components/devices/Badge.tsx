import { WifiIcon, WifiOffIcon } from "lucide-react";

interface Props {
  state: string
}

const Badge = ({ state }: Props) => {
  const bgColor = state === 'Online' ? 'bg-green-500' : 'bg-red-500'

  return (
    <span className={`${bgColor} absolute top-2 right-2 z-1 text-sm text-white flex items-center gap-1 rounded-xl px-2`}>
      {state === 'Online' ?
        <WifiIcon size={14} strokeWidth={2} /> :
        <WifiOffIcon size={14} strokeWidth={2} />
      }
      {state}
    </span>
  );
}
 
export default Badge;