import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebouncer";
import deviceService from "../services/deviceService";
import DeviceCard from "../components/DeviceCard";
import { SearchIcon } from "lucide-react";

const Devices = () => {

  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(5);
  const debouncedSearch = useDebounce(search, 750);

  const { data, error, isLoading } = useQuery({
    queryKey: ['devices', debouncedSearch, limit],
    queryFn: () => deviceService.getDevices(limit, 0, debouncedSearch),
  })
  
  // TODO: agregar un componente de loading y un componente de error
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (data) console.log(data);

  return (
    <div className="max-w-[1200px] w-full mb-4">
      {/* Searchbar */}
      <section className="flex items-center gap-4 mt-8">
        <div className="relative max-w-[400px] flex items-center">
          <input
            className="text-primary-200 outline-none border-b-1 border-primary-200 focus:border-primary-100 transition-[border] py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
            placeholder="Buscar..."
          />
          <SearchIcon size={20} className="absolute right-0"/>
        </div>

        <button
          className="max-w-[100px] w-full text-center text-primary-100 border-1 rounded-md cursor-pointer transition hover:border-primary-100 py-2"
          type="button"
          onClick={() => setLimit(prev => prev + 5)}
        >
          Cargar más
        </button>
      </section>

      {/* Listado de dispositivos */}
      <section className="flex flex-wrap gap-6 mt-8">
        { data && data.results.map((device) =>
          <DeviceCard
            key={device.id_device}
            name={device.device_name}
            imageUrl={device.photo}
          />
        ) }
      </section>
    </div>
  );
}
 
export default Devices;