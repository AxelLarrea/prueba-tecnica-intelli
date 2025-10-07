import { useState } from "react";
import type { ModuleNode } from "../../utils/formatModules";
import MenuItem from "./MenuItem";
import { ExternalLinkIcon, XIcon } from "lucide-react";

interface Props {
  modules: ModuleNode[]
  links: Link[]
  isMobile: boolean
  closeMenu?: (value: boolean) => void
}

interface Link {
  name: string
  path: string
}

const Menu = ({ modules, links, isMobile, closeMenu }: Props) => {
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
    'absolute -right-[16px] z-10 bg-background w-[100dvw] h-screen flex border-1 rounded-lg' : 
    'hidden w-full h-full border-r-1';

  return (
    <aside 
      className={`${classes} max-w-90 flex-col border-border overflow-hidden p-6 lg:flex` }
    >
      <header className="mt-6">
        { isMobile &&
          <button
            className="absolute top-4 right-5"
            onClick={() => closeMenu && closeMenu(false)}
          >
            <XIcon size={30} className="text-primary" />
          </button>
        }
        <h2 className="text-lg font-semibold">Módulos</h2>
      </header>

      <section className="min-h-0 max-h-[550px] flex flex-col gap-2 border border-border rounded-xl shadow-sm overflow-auto [&::-webkit-scrollbar]:w-0 p-2 mt-4">
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

      { links && 
        <section className="flex flex-col mt-4">
          <h2 className="text-xl font-semibold mb-2">Otros links</h2>
          <div className="border border-border rounded-xl shadow-sm p-2">
            { links.map( link =>
                <a
                  key={link.name}
                  className="w-full text-primary-500 font-semibold flex items-center gap-2 rounded-lg cursor-pointer p-2 hover:bg-background-accent hover:text-primary transition-colors"
                  href={link.path}
                >
                  <div className="bg-primary/10 rounded-xl p-2">
                    <ExternalLinkIcon size={18} className="text-primary"/>
                  </div>
                  {link.name}
                </a>
              )
            }
          </div>
        </section>
      }
    </aside>
  );
}
 
export default Menu;