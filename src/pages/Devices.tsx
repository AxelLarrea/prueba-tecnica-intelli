import { SearchIcon } from "lucide-react";

const Devices = () => {
  return (
    <>
      <h1>Devices</h1>

      {/* Searchbar */}
      {/* TODO: agregar un debouncer para la busqueda */}
      <div className="w-40 flex border-b-1 border-primary-200">
        <input
          className="w-full outline-0"
          type="text" 
          name="search" 
          id="search" 
          placeholder="Buscar..."
        />

        <button className="cursor-pointer" type="submit">
          <SearchIcon size={20} />
        </button>
      </div>

      {/* Listado de dispositivos */}
      <section>

      </section>

      <button type="button">Cargar más</button>
      {/* TODO: agregar un paginador */}
      <div></div>
    </>
  );
}
 
export default Devices;