import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface Props {
  name: string
  imageUrl: string
  state: string
}

const Card = ({ name, imageUrl, state }: Props) => {
  const formattedName = name.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');

  const colors: { [key: string]: string } = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500'
  };
    
  const color = colors[state]

  return (
    <div className={`w-45 h-70 flex flex-col shadow-[0_1px_5px] shadow-primary-500/80 rounded-md cursor-pointer overflow-hidden hover:-translate-y-2 transition-all`}>
      <img src={imageUrl} alt={name} height={200} width={180} className="w-full h-50 object-cover" />

      <div className="mt-4">
        <h3 className="font-semibold text-lg text-center line-clamp-1">{formattedName}</h3>
        { state &&
          <div className="flex items-center justify-center gap-2">
            <span className={`${color} size-2 rounded-full`}></span>
            <p className="text-sm font-semibold rounded-md text-primary-100">
              {state}
            </p>
          </div>
        }
      </div>
    </div>
  );
}
 
export default Card;