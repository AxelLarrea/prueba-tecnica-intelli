import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import type { ModuleNode } from "../utils/formatModules";
import { ChevronRightIcon } from "lucide-react";

interface Props {
  module: ModuleNode
  openPaths: Set<string>
  handleToggle: (path:string) => void
}

const MenuItem = ({ module, openPaths, handleToggle }: Props) => {
  const { children } = module;
  
  const name = module.module.split('_').map(word => capitalizeFirstLetter(word)).join('');
  const isOpen = openPaths.has(module.path);
  const hasChildren = children.length > 0;

  // const multiplyer = [0, 3, 9, 12] // multiplicadores según el nivel del módulo
  

  return (
    <div className="w-full flex flex-col items-center cursor-pointer">
      {/* Info del módulo */}
      <div 
        className="group relative w-full flex items-center justify-between hover:underline hover:underline-offset-3 hover:text-primary-100"
        style={{ paddingLeft: `${module.level * 16}px` }}
        onClick={() => handleToggle(module.path)}
      >
        {/* TODO: quitar span y reemplazar por border-left */}	
        {/* { module.level > 0 && 
          <span 
            className="absolute w-[6px] h-[6px] rounded-bl-[2px] border-l-1 border-b-1 border-primary-200"
            style={{ left: `${module.level * multiplyer[module.level]}px` }}
          ></span> 
          } */}
        <p className="text-primary-500 font-semibold text-base group-hover:text-primary-100">{name}</p>
        { hasChildren &&
          <ChevronRightIcon
            size={15}
            strokeWidth={2}
            className={`${isOpen && hasChildren ? 'rotate-90' : ''} transition-all duration-250`}
          />
        }
      </div>
      
      {/* Submódulos */}
      {/* TODO: cambiar transición */}
      <div 
        className={`
           w-full grid transition-all duration-500 ease-in border-l-1 border-primary-500/30
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        { hasChildren && isOpen && 
          children.map((module) => (
            <MenuItem 
              key={module.id_module} 
              module={module} 
              openPaths={openPaths}
              handleToggle={handleToggle}
            /> 
          ))
        }
      </div>
    </div>
  );
}
 
export default MenuItem;