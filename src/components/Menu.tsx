import { useState } from "react";
import type { ModuleNode } from "../utils/formatModules";
import MenuItem from "./MenuItem";

interface Props {
  modules: ModuleNode[]
}

const Menu = ({ modules }: Props) => {
  // Set que guardará los paths abiertos
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

  return (
    <aside className="max-w-90 w-full h-full flex flex-col gap-4 border-r-1 border-primary-500/30 p-4">
      <header className="pl-4 mt-12">
        <h2 className="text-3xl font-semibold text-primary-100">Módulos</h2>
      </header>

      <section className="flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-0 p-4">
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
      </section>
    </aside>
  );
}
 
export default Menu;