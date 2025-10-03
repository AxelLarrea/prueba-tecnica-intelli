import { Link } from "wouter";
import { useUserStore } from "../../store/userStore";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import SandwichMenu from "./SandwichMenu";

const Header = () => {
  const { userData } = useUserStore();
  const name = userData && capitalizeFirstLetter(userData.user.first_name)

  return (
    <header className="h-25 flex flex-col items-center justify-center border-b-1 border-primary-500/30 p-4">
      <div className="max-w-[1200px] w-full flex items-center justify-between mx-auto">
        <h1 className="text-3xl text-primary-100 font-semibold">
          <a href="/">
            Prueba
            <span className="text-primary-500">Técnica</span>
          </a>
        </h1>

        <nav className="hidden font-semibold items-center gap-4 lg:flex">
          <Link
            href="/" 
            className={(active) => (active ? "underline underline-offset-3 text-primary-100" : "hover:underline hover:underline-offset-3 hover:text-primary-100")}
          >
            Home
          </Link>

          <Link
            href="/devices" 
            className={(active) => (active ? "underline underline-offset-3 text-primary-100" : "hover:underline hover:underline-offset-3 hover:text-primary-100")}
          >
            Devices
          </Link>
        </nav>

        { userData && 
          <p className="hidden text-lg font-medium lg:block">Hola, 
            <span className="text-primary-100 ml-1">
              {name}
            </span>
          </p>
        }

        <SandwichMenu />
      </div>

      
    </header>
  );
}
 
export default Header;