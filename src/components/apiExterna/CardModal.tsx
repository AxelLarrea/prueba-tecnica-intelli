import { EarthIcon, LucideFeather, MapPin, UserIcon } from "lucide-react";

interface Props {
  formattedName: string;
  gender: string;
  species: string;
  location: string;
  origin: string;
  isClick: boolean
  setIsClick: (value: boolean) => void
}

const CardModal = ({ formattedName, gender, species, location, origin, isClick, setIsClick }: Props) => {
  return (
    <>
      <div className={`absolute inset-0 z-0 w-full h-full bg-background rounded-md flex flex-col gap-4 p-4 transition-all
        ${isClick ? 'opacity-100' : 'translate-y-8 pointer-events-none opacity-0'}
      `}>
        <h2 className="text-lg font-semibold text-primary-200 text-center">{formattedName}</h2>

        <section className="flex flex-col justify-self-center gap-1">
          <div className="flex items-center gap-2">
            <UserIcon size={18} className="text-primary shrink-0"/>
            <p>{gender}</p>
          </div>

          <div className="flex items-center gap-2">
            <LucideFeather size={18} className="text-primary shrink-0"/>
            <p>{species}</p>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={18} className="text-primary shrink-0 mt-1" />
            <p>{location}</p>
          </div>

          <div className="flex items-start gap-2">
            <EarthIcon size={18} className="text-primary shrink-0 mt-1"/>
            <p>{origin}</p>
          </div>
        </section>

        <button 
          className="w-full font-semibold text-sm text-center border border-border rounded-md cursor-pointer hover:bg-background-accent hover:text-primary transition-colors px-4 py-1 mx-auto mt-auto"
          onClick={() => setIsClick(false)}
        >
          Cerrar
        </button>
      </div>
    </>
  );
}
 
export default CardModal;