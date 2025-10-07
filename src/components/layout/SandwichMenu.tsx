import { useEffect, useState } from "react";
import Menu from "../home/Menu";
import { formatModules } from "../../utils/formatModules";
import { useUserStore } from "../../store/userStore";
import { MenuSquareIcon } from "lucide-react";

const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Devices',
    path: '/devices'
  },
  {
    name: 'Api Externa',
    path: '/api'
  },
]

const SandwichMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUserStore();

  const modules = userData && userData.modules.sort((a, b) => a.id_module - b.id_module);
  const formattedModules = modules && formatModules(modules);

  useEffect(() => {
    // Bloquear scroll cuando el menu en mobile esté abierto

    if (isOpen) {
      // Guardar el scroll actual
      const scrollY = window.scrollY;
      
      // Estilos para bloquear scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Restaurar scroll al cerrar
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative lg:hidden">
      <button
        className="flex items-center size-6 text-primary-100 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuSquareIcon size={30} className="text-primary" />
      </button>
        
      <div 
        className={`fixed z-10 inset-0 bg-black/50 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <section className={`${isOpen ? 'translate-x-0' : 'translate-x-[400px]'} z-20 fixed top-0 right-0 h-screen transition-all ease-in-out duration-300`}>
        <Menu
          modules={formattedModules!}
          links={links}
          isMobile={true}
          closeMenu={setIsOpen}
        />
      </section>
    </div>
  );
}
 
export default SandwichMenu;