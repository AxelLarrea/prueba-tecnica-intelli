import { useState } from "react";
import type { ModuleNode } from "../../utils/formatModules";
import MenuItem from "./MenuItem";

interface Props {
  modules: ModuleNode[]
  links: Link[]
  isMobile: boolean
}

interface Link {
  name: string
  path: string
}

const Menu = ({ modules, links, isMobile }: Props) => {
  // Set que guardará los paths abiertos (guarda valores únicos)
  const [openPaths, setOpenPaths] = useState<Set<string>>(new Set());

  // Función para abrir o cerrar un path (submenú de módulos)
  const togglePath = (path: string) => {
    setOpenPaths(prev => {
      const newSet = new Set(prev); 
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const classes = isMobile ? 
    'absolute top-full right-[-16px] z-10 bg-black w-[100dvw] flex border-1 border-r-0 rounded-s' : 
    'hidden w-full h-full border-r-1';

  return (
    <aside 
      className={`${classes} max-w-90  flex-col  border-primary-500/30 p-4 lg:flex` }
    >
      <header className="pl-4 mt-12">
        <h2 className="text-3xl font-semibold text-primary-100">Módulos</h2>
      </header>

      <section className="flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-0 p-4 pt-2">
        { modules && 
          modules.map( module => 
            <MenuItem 
              key={module.id_module} 
              module={module}
              openPaths={openPaths}
              handleToggle={togglePath}
            />
          )
        }


        { links && 
          <div className="flex flex-col mt-4">
            <h2 className="text-2xl font-semibold text-primary-100 mb-2">Otros links</h2>
            { links.map( link => 
                <a 
                  key={link.name} 
                  className="w-full text-primary-500 font-semibold text-base hover:underline hover:underline-offset-3 hover:text-primary-100" 
                  href={link.path}
                >
                  {link.name}
                </a>
              )
            }
          </div>}
      </section>
    </aside>
  );
}
 
export default Menu;