import { CheckIcon } from "lucide-react";

interface Props {
  isOpen: boolean
  filter: 'Todos' | 'Online' | 'Offline'
  setFilter: (filter: 'Todos' | 'Online' | 'Offline') => void
  setIsOpen: (isOpen: boolean) => void
}

const DevicesFiltersModal = ({ isOpen, filter, setFilter, setIsOpen }: Props) => {

  const handleClick = (filter: 'Todos' | 'Online' | 'Offline') => {
    setFilter(filter);
    setIsOpen(false);
  }

  return (
    <section className={`absolute top-12 right-0 z-10 w-[200px] bg-background border border-border rounded-xl shadow-md flex flex-col gap-2 p-4 transition-all duration-200 ease-in-out
      ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
    `}>
      <p className="font-semibold">Estado</p>

      <div className="flex flex-col items-start gap-2">
        <button 
          className="relative w-full font-semibold text-sm text-start rounded-md cursor-pointer hover:text-primary hover:bg-background-accent transition-colors py-1 pl-7"
          onClick={() => handleClick('Todos')}
        >
          {filter === 'Todos' && <CheckIcon size={16} className="absolute left-1 top-1.5 text-primary"/>}
          Todos
        </button>

        <button 
          className="relative w-full font-semibold text-sm text-start rounded-md cursor-pointer hover:text-primary hover:bg-background-accent transition-colors py-1 pl-7"
          onClick={() => handleClick('Online')}
        >
          {filter === 'Online' && <CheckIcon size={16} className="absolute left-1 top-1.5 text-primary"/>}
          Online
        </button>

        <button 
          className="relative w-full font-semibold text-sm text-start rounded-md cursor-pointer hover:text-primary hover:bg-background-accent transition-colors py-1 pl-7"
          onClick={() => handleClick('Offline')}
        >
          {filter === 'Offline' && <CheckIcon size={16} className="absolute left-1 top-1.5 text-primary"/>}
          Offline
        </button>
      </div>
    </section>
  );
}
 
export default DevicesFiltersModal;