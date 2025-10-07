import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import type { ModuleNode } from "../../utils/formatModules";
import { ChevronRightIcon, LucideSquareGanttChart } from "lucide-react";

interface Props {
  module: ModuleNode
  openPaths: Set<string>
  handleToggle: (path:string) => void
}

const MenuItem = ({ module, openPaths, handleToggle }: Props) => {
  const { children } = module;
  
  const name = module.module.split('_').map(word => capitalizeFirstLetter(word)).join(' ');
  const hasChildren = children.length > 0;  
  const isOpen = openPaths.has(module.path);
  const isOpenClasses = isOpen ? 'text-primary' : 'text-primary-500';

  return (
    <div className="w-full flex flex-col items-center cursor-pointer">
      {/* Info del módulo */}
      <div 
        className={`${isOpenClasses} group relative w-full flex items-center gap-2 rounded-lg hover:text-primary hover:bg-background-accent transition p-2`}
        onClick={() => handleToggle(module.path)}
      >
        <div 
          className="bg-primary/10 rounded-xl p-2" 
          style={{ marginLeft: `${module.level * 16}px` }}
        >
          <LucideSquareGanttChart size={16} className="text-primary" />
        </div>

        <div className="flex flex-1 items-center justify-between">
          <p
            className={`font-semibold ${isOpenClasses}`}
          >
            {name}
          </p>
          { hasChildren &&
            <ChevronRightIcon
              size={15}
              strokeWidth={2}
              className={`${isOpen && hasChildren ? 'rotate-90' : ''} transition-all duration-250`}
            />
          }
        </div>
      </div>
      
      {/* Submódulos */}
      <div 
        className={`w-full grid transition-all duration-300 ease-in-out
          ${isOpen ? 'grid-rows-[1fr] max-h-full opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}
        `}
      >
        <div className="min-h-0 overflow-hidden">
          { hasChildren &&
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
    </div>
  );
}
 
export default MenuItem;