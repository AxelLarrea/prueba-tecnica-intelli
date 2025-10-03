import { useUserStore } from "../store/userStore";
import LoginForm from "../components/LoginForm";
import Welcome from "../components/Welcome";
import Menu from "../components/Menu";
import { formatModules } from "../utils/formatModules";


const Home = () => {
  const { userData } = useUserStore();
  
  const modules = userData && userData.modules.sort((a, b) => a.id_module - b.id_module);
  const formattedModules = modules && formatModules(modules);

  return (
    <>
      { userData ? 
        <div className="flex flex-1 items-center gap-8">
          <Menu modules={formattedModules!}/>
          <Welcome />
        </div>
        : 
        <LoginForm /> 
      }
    </>
  );
}
 
export default Home;