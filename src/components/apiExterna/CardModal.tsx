import { EarthIcon, LucideFeather, MapPin, UserIcon } from "lucide-react";

interface Props {
  formattedName: string;
  gender: string;
  species: string;
  location: string;
  origin: string;
  isClick: boolean
}

const CardModal = ({ formattedName, gender, species, location, origin, isClick }: Props) => {
  return (
    <>
      { isClick &&
        <div className="absolute inset-0 z-1 w-45 h-70 bg-black border border-primary-500/40 rounded-md flex flex-col gap-4 p-4 transition-all">
          <h2 className="text-lg font-semibold text-primary-200 text-center">{formattedName}</h2>

          <section className="flex flex-col justify-self-center gap-1">
            <div className="flex items-center gap-2">
              <UserIcon size={18} className="text-primary-100 shrink-0"/>
              <p>{gender}</p>
            </div>

            <div className="flex items-center gap-2">
              <LucideFeather size={18} className="text-primary-100 shrink-0"/>
              <p>{species}</p>
            </div>

            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-primary-100 shrink-0 mt-1" />
              <p>{location}</p>
            </div>

            <div className="flex items-start gap-2">
              <EarthIcon size={18} className="text-primary-100 shrink-0 mt-1"/>
              <p>{origin}</p>
            </div>
          </section>
        </div>
      }
    </>
  );
}
 
export default CardModal;