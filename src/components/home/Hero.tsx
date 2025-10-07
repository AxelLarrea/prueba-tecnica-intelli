import { StarsIcon } from "lucide-react";

interface Props {
  name: string
  lastName: string
}

const Hero = ({ name, lastName }: Props) => {
  return (
    <section className="w-full bg-background-tertiary flex flex-col gap-4 rounded-2xl border border-primary/20 p-4 mb-8 lg:p-12">
      <div className="w-45 text-primary bg-primary/10 flex items-center gap-2 rounded-full px-4 py-1">
        <StarsIcon size={18} />  
        <p className="text-md font-medium">Panel de Control</p>
      </div> 

      <h1 className="text-4xl font-bold lg:text-6xl">¡Bienvenido!</h1>
      <h2 className="text-xl text-primary font-semibold lg:text-2xl">{name + ' ' + lastName}</h2>

      <p className="max-w-xl text-lg text-secondary-100 text-pretty">
        Gestiona todos tus módulos y accede a las herramientas que necesitas desde un solo lugar.
      </p>
    </section>
  );
}
 
export default Hero;