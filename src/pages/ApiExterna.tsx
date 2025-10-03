import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "../components/CharacterCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface Character {
  id: number
  name: string
  status: string
  image: string
}

const ApiExterna = () => {

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}&page=${page}`);
    const data = await response.json();
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['api-externa', search, page],
    queryFn: fetchData
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {/* TODO: agregar una searchbar */}
      {/* Listado de personajes */}
      <section className="flex flex-col gap-4 my-8">
        <div className="flex flex-wrap gap-6">
          { data && data.results.map((character: Character) =>
            <CharacterCard
              key={character.id}
              name={character.name}
              imageUrl={character.image}
              state={character.status}
            />
          ) }
        </div>

        <div className="w-full flex justify-center gap-4">
          { data.info.prev &&
            <button 
              className="max-w-[110px] w-full flex items-center justify-center gap-1 text-center text-primary-100 border-1 rounded-md cursor-pointer transition hover:border-primary-100 py-2"
              onClick={() => setPage(prev => prev - 1)}
            >
              <ArrowLeftIcon size={15} strokeWidth={2} />
              Anterior
            </button>
          }

          { data.info.next &&
            <button 
              className="max-w-[110px] w-full flex items-center justify-center gap-1 text-center text-primary-100 border-1 rounded-md cursor-pointer transition hover:border-primary-100 py-2"
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