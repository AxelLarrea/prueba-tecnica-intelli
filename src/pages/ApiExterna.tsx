import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/apiExterna/CharacterCard";
import Loading from "../components/shared/Loading";
import ErrorComponent from "../components/shared/ErrorComponent";
import { ArrowLeftIcon, ArrowRightIcon, FilterIcon, SearchIcon } from "lucide-react";
import { useDebounce } from "../hooks/useDebouncer";
import FiltersModal from "../components/apiExterna/FiltersModal";

interface Character {
  id: number
  name: string
  gender: string
  species: string
  status: string
  image: string
  location: {
    name: string
  }
  origin: {
    name: string
  }
}

const ApiExterna = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'' | 'Alive' | 'Dead' | 'unknown'>('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 750);

  const fetchData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${debouncedSearch}&page=${page}&status=${filter}`);
    const data = await response.json();
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['api-externa', debouncedSearch, page, filter],
    queryFn: fetchData
  })

  if (isLoading) return <Loading />
  if (error) return <ErrorComponent message={error.message} />

  return (
    <>
      {/* Listado de personajes */}
      <section className="max-w-[1200px] w-full grid mx-auto mb-4">
        <section className="group w-full h-10 relative flex items-center gap-4 mt-4">
          <SearchIcon size={20} className="absolute left-4 group-focus-within:text-primary transition"/>
          <input
            className="w-full h-full text-primary-200 outline-none border border-border rounded-xl shadow-xs focus:border-primary transition-colors pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
            placeholder="Buscar personajes..."
          />

          {/* Filtros */}
          <div className="h-full relative">
            <button 
              className="h-full font-semibold flex items-center gap-2 border border-border rounded-xl shadow-xs cursor-pointer hover:bg-background-accent hover:text-primary transition-colors px-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FilterIcon size={20} className="text-primary"/>
              Filtros
            </button>

            <FiltersModal 
              isOpen={isOpen} 
              filter={filter} 
              setFilter={setFilter} 
              setIsOpen={setIsOpen}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          { data && data.results.map((character: Character) =>
            <CharacterCard
              key={character.id}
              name={character.name}
              gender={character.gender}
              imageUrl={character.image}
              state={character.status}
              species={character.species}
              location={character.location.name}
              origin={character.origin.name}
            />
            ) 
          }
        </div>
              
        {/* Botones de paginacion */}
        <div className="w-full flex justify-center gap-5">
          { data.info.prev &&
            <button 
              className="max-w-[100px] w-full h-10 font-semibold text-sm text-center text-primary-200 flex items-center gap-1 border border-border rounded-md shadow-sm cursor-pointer transition hover:text-primary hover:bg-background-tertiary px-3 py-2 mt-4"
              onClick={() => setPage(prev => prev - 1)}
            >
              <ArrowLeftIcon size={15} strokeWidth={2} className="shrink-0"/>
              Anterior
            </button>
          }

          { data.info.next &&
            <button 
              className="max-w-[100px] w-full h-10 font-semibold text-sm text-center text-primary-200 flex items-center gap-1 border border-border rounded-md shadow-sm cursor-pointer transition hover:text-primary hover:bg-background-tertiary px-3 py-2 mt-4"
              onClick={() => setPage(prev => prev + 1)}
            >
              Siguiente
              <ArrowRightIcon size={15} strokeWidth={2} className="shrink-0"/>
            </button>
          }
        </div>
      </section>
    </>
  );
}
 
export default ApiExterna;