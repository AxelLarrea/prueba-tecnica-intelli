import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import CardModal from "./CardModal";

interface Props {
  name: string
  gender: string
  imageUrl: string
  state: string
  species: string
  location: string
  origin: string
}

const Card = ({ name, gender, imageUrl, state, species, location, origin }: Props) => {
  const [isClick, setIsClick] = useState(false);
  const formattedName = name.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  const cleanState = state === 'unknown' ? capitalizeFirstLetter(state) : state;

  const colors: { [key: string]: string } = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-400'
  };
    
  const color = colors[state]

  return (
    <div 
      className="relative w-45 h-70 flex flex-col shadow-[0_1px_5px] shadow-primary-500/80 rounded-md cursor-pointer hover:-translate-y-2 transition-all"
      style={{ zIndex: isClick ? 1 : 0 }}
      onClick={() => setIsClick(!isClick)}
      onMouseLeave={() => setIsClick(false)}
    >
      <img src={imageUrl} alt={name} height={200} width={180} className="w-full h-50 rounded-t-md object-cover" />

      <div className="mt-4">
        <h3 className="text-primary-200 font-semibold text-lg text-center line-clamp-1">{formattedName}</h3>
        { state &&
          <div className="flex items-center justify-center gap-2">
            <span className={`${color} size-2 rounded-full`}></span>
            <p className="text-sm font-semibold rounded-md text-primary-500/80">
              {cleanState}
            </p>
          </div>
        }
      </div>

      {/* MODAL */}
      <CardModal 
        formattedName={formattedName} 
        gender={gender} 
        species={species} 
        location={location} 
        origin={origin} 
        isClick={isClick} 
      />
    </div>
  );
}
 
export default Card;