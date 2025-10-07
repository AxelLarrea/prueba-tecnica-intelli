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

  const stateTrad: { [key: string]: string } = {
    unknown: "Desconocido",
    Alive: "Vivo",
    Dead: "Muerto"
  }

  return (
    <div 
      className="group relative flex flex-col border border-border shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
      style={{ zIndex: isClick ? 1 : 0 }}
      onMouseLeave={() => setIsClick(false)}
    >
      <img src={imageUrl} alt={name} height={200} width={180} className="w-full h-50 rounded-t-lg object-cover group-hover:scale-102 transition-all" />

      <div className="flex flex-col p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{formattedName}</h3>

        { state &&
          <div className="flex justify-between gap-2 mt-2">
            <span className="text-sm text-secondary-100">Estado: </span>
            <p className="text-sm text-primary font-medium flex justify-between">
              {stateTrad[state]}
            </p>
          </div>
        }

        <button 
          className="w-full font-semibold text-sm text-center text-primary border border-border rounded-md shadow-xs cursor-pointer hover:bg-background-accent transition-colors px-4 py-1 mt-4 mx-auto"
          onClick={() => setIsClick(!isClick)}
        >
          Ver Detalles
        </button>
      </div>

      {/* Modal */}
      <CardModal 
        formattedName={formattedName} 
        gender={gender} 
        species={species} 
        location={location} 
        origin={origin} 
        isClick={isClick}
        setIsClick={setIsClick}
      />
    </div>
  );
}
 
export default Card;