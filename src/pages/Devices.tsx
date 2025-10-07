import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebouncer";
import deviceService from "../services/deviceService";
import DeviceCard from "../components/devices/DeviceCard";
import Loading from "../components/shared/Loading";
import ErrorComponent from "../components/shared/ErrorComponent";
import { FilterIcon, SearchIcon } from "lucide-react";
import DevicesFiltersModal from "../components/devices/DevicesFiltersModal";

const Devices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'Todos' | 'Online' | 'Offline'>('Todos');
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(5);
  const debouncedSearch = useDebounce(search, 750);

  const { data, error, isLoading } = useQuery({
    queryKey: ['devices', debouncedSearch, limit],
    queryFn: () => deviceService.getDevices(limit, 0, debouncedSearch),
  })
  
  if (isLoading) return <Loading />
  if (error) return <ErrorComponent message={error.message} />
  
  const values = {
    'Todos': 'Todos',
    'Online': 1,
    'Offline': 0
  }
  const filteredDevices = data?.results.filter((device) => {
    if(device.settings_device.online === values[filter]) return device;
    if(filter === 'Todos') return device;
  });
  
  return (
    <div className="max-w-[1200px] w-full grid mx-auto mb-4">
      {/* Hero */}
      <section className="mb-4 mt-8">
        <h1 className="text-4xl font-bold mb-2">Dispositivos</h1>
        <p className="text-lg text-secondary-100">Gestiona y monitorea todos los dispositivos conectados</p>
      </section>

      <section className="w-full h-10 flex items-center justify-between gap-4 mt-4">
        {/* Searchbar */}
        <div className="group w-full h-full relative flex items-center">
          <SearchIcon size={20} className="absolute left-4 group-focus-within:text-primary transition"/>
          <input
            className="w-full h-full text-primary-200 outline-none border border-border rounded-xl shadow-xs focus:border-primary transition-colors pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
            placeholder="Buscar dispositivos..."
          />
        </div>

        {/* Filtros */}
        <div className="h-full relative">
          <button 
            className="h-full font-semibold flex items-center gap-2 border border-border rounded-xl shadow-xs cursor-pointer hover:bg-background-accent hover:text-primary transition-colors px-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FilterIcon size={20} className="text-primary"/>
            Filtros
          </button>

          <DevicesFiltersModal 
            isOpen={isOpen} 
            filter={filter} 
            setFilter={setFilter} 
            setIsOpen={setIsOpen}
          />
        </div>
      </section>

      {/* Listado de dispositivos */}
      <section className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-6">
        { filteredDevices && filteredDevices.map((device) =>
          <DeviceCard
            key={device.id_device}
            name={device.device_name}
            imageUrl={device.photo}
            state={device.settings_device.online}
          />
        ) }
      </section>

      <button
        className="max-w-[100px] w-full h-10 font-semibold text-sm text-center text-primary-200 border border-border rounded-md shadow-sm cursor-pointer transition hover:text-primary hover:bg-background-tertiary py-2 mt-4 mx-auto"
        type="button"
        onClick={() => setLimit(prev => prev + 5)}
      >
        Cargar más
      </button>
    </div>
  );
}
 
export default Devices;