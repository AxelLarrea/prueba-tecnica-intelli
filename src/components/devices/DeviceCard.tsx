import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import Badge from "./Badge";

interface Props {
  name: string
  imageUrl: string
  state: number
}

const DeviceCard = ({ name, imageUrl, state }: Props) => {
  const formattedName = name.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  
  return (
    <div className="group relative h-75 flex flex-col gap-4 shadow-sm border border-border rounded-xl cursor-pointer hover:shadow-md transition-all duration-200">
      {state === 0 ? <Badge state="Offline" /> : <Badge state="Online" />}
      <div className="bg-background-accent rounded-t-xl p-4">
        <img src={imageUrl} alt={name} height={200} width={180} className="w-full h-50 object-contain group-hover:scale-102 transition-all" />
      </div>
      <h3 className="font-semibold text-primary-200 text-center line-clamp-1 pb-4">{formattedName}</h3>
    </div>
  );
}
 
export default DeviceCard;