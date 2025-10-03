import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebouncer";
import deviceService from "../services/deviceService";
import DeviceCard from "../components/devices/DeviceCard";
import Loading from "../components/shared/Loading";
import ErrorComponent from "../components/shared/ErrorComponent";
import { SearchIcon } from "lucide-react";

const Devices = () => {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(5);
  const debouncedSearch = useDebounce(search, 750);

  const { data, error, isLoading } = useQuery({
    queryKey: ['devices', debouncedSearch, limit],
    queryFn: () => deviceService.getDevices(limit, 0, debouncedSearch),
  })
  
  if (isLoading) return <Loading />
  
  if (error) return <ErrorComponent message={error.message} />

  return (
    <div className="max-w-[1200px] w-full mb-4">
      {/* Searchbar */}
      <section className="max-w-[400px] w-full flex items-center gap-4 mt-8 lg:max-w-[380px]">
        <div className="group w-full relative flex items-center">
          <input
            className="w-full text-primary-200 outline-none border-b-1 border-primary-500/40 focus:border-primary-100 transition-[border] py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
            placeholder="Buscar..."
          />
          <SearchIcon size={20} className="absolute right-0 group-focus-within:text-primary-100 transition"/>
        </div>

        <button
          className="max-w-[100px] w-full font-semibold text-center text-primary-200 border-1 border-primary-500/40 rounded-md cursor-pointer transition hover:text-primary-100 hover:border-primary-500/60 py-2"
          type="button"
          onClick={() => setLimit(prev => prev + 5)}
        >
          Cargar más
        </button>
      </section>

      {/* Listado de dispositivos */}
      <section className="flex flex-wrap gap-4 mt-8 lg:gap-6">
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