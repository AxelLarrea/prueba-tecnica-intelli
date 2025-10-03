import { useState } from "react";
import Menu from "../menu/Menu";
import { formatModules } from "../../utils/formatModules";
import { useUserStore } from "../../store/userStore";
import { MenuSquareIcon, XIcon } from "lucide-react";

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


  return (
    <div className="relative lg:hidden">
      <button
        className="flex items-center size-6 text-primary-100 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        { isOpen ?
          <XIcon size={30} className="text-primary-100" /> :
          <MenuSquareIcon size={30} className="text-primary-100" />
        }
      </button>
      { isOpen &&
        <Menu
          modules={formattedModules!}
          links={links}
          isMobile={true}
        />
      }
    </div>
  );
}
 
export default SandwichMenu;