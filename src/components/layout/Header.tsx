import { Link } from "wouter";
import { useUserStore } from "../../store/userStore";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import SandwichMenu from "./SandwichMenu";
import { UserIcon } from "lucide-react";

const Header = () => {
  const { userData } = useUserStore();
  const name = userData && capitalizeFirstLetter(userData.user.first_name)

  return (
    <header className="h-25 flex flex-col items-center justify-center border-b-1 border-border py-4 px-4 xl:px-8">
      <div className="w-full flex items-center justify-between mx-auto">
        <h1 className="text-3xl text-primary-100 font-bold">
          <a href="/">
            Prueba
            <span className="text-primary">Técnica</span>
          </a>
        </h1>

        <nav className="hidden font-semibold items-center gap-4 lg:flex">
          <Link
            href="/" 
            className={(active) => (active ? "text-primary" : "text-secondary-100 hover:text-secondary-500")}
          >
            Home
          </Link>

          <Link
            href="/devices" 
            className={(active) => (active ? "text-primary" : "text-secondary-100 hover:text-secondary-500")}
          >
            Devices
          </Link>
        </nav>

        { userData &&
          <div className="hidden bg-primary/15 items-center gap-2 rounded-full px-4 py-2 lg:flex ">
            <UserIcon size={18} className="text-primary" />  
            <p className="text-md font-medium">Hola, 
              <span className="ml-1">
                {name}
              </span>
            </p>
          </div> 
        }

        <SandwichMenu />
      </div>

      
    </header>
  );
}
 
export default Header;