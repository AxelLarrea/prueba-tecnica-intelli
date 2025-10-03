import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface Props {
  name: string
  imageUrl: string
}

const DeviceCard = ({ name, imageUrl }: Props) => {
  const formattedName = name.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');

  return (
    <div className={`w-45 h-70 flex flex-col gap-4 shadow-[0_1px_5px] shadow-primary-500/80 border-t-1 border-primary-500/40 rounded-md cursor-pointer hover:-translate-y-2 transition-all p-4`}>
      <img src={imageUrl} alt={name} height={200} width={180} className="w-full h-50 object-contain" />
      <h3 className="font-semibold  text-primary-200 text-center line-clamp-1">{formattedName}</h3>
    </div>
  );
}
 
export default DeviceCard;