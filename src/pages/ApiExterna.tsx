import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/apiExterna/CharacterCard";
import Loading from "../components/shared/Loading";
import ErrorComponent from "../components/shared/ErrorComponent";
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "lucide-react";
import { useDebounce } from "../hooks/useDebouncer";

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

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 750);

  const fetchData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${debouncedSearch}&page=${page}`);
    const data = await response.json();
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['api-externa', debouncedSearch, page],
    queryFn: fetchData
  })

  if (isLoading) return <Loading />
  if (error) return <ErrorComponent message={error.message} />

  return (
    <>
      {/* TODO: agregar una searchbar */}
      {/* Listado de personajes */}
      <section className="flex flex-col gap-4 my-8">
        <section className="max-w-[400px] w-full flex items-center gap-4 lg:max-w-[380px]">
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
        </section>

        <div className="flex flex-wrap gap-4 lg:gap-6">
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
        <div className="w-full flex justify-center gap-4">
          { data.info.prev &&
            <button 
              className="max-w-[110px] w-full font-semibold flex items-center justify-center gap-1 text-center text-primary-100 border-1 border-primary-500/40 rounded-md cursor-pointer transition hover:border-primary-500/60 py-2"
              onClick={() => setPage(prev => prev - 1)}
            >
              <ArrowLeftIcon size={15} strokeWidth={2} />
              Anterior
            </button>
          }

          { data.info.next &&
            <button 
              className="max-w-[110px] w-full font-semibold flex items-center justify-center gap-1 text-center text-primary-100 border-1 border-primary-500/40 rounded-md cursor-pointer transition hover:border-primary-500/60 py-2"
              onClick={() => setPage(prev => prev + 1)}
            >
              Siguiente
              <ArrowRightIcon size={15} strokeWidth={2} />
            </button>
          }
        </div>
      </section>
    </>
  );
}
 
export default ApiExterna;