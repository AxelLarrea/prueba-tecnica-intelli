import { useUserStore } from "../store/userStore";
import Welcome from "../components/menu/Welcome";
import Menu from "../components/menu/Menu";
import { formatModules } from "../utils/formatModules";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/shared/Loading";
import ErrorComponent from "../components/shared/ErrorComponent";

const userCredentials = { 
  email: 'carlospea13+1@gmail.com', 
  password: '123456' 
};

const links = [{
  name: 'Api Externa',
  path: '/api'
}]

const Home = () => {
  const { userData, login } = useUserStore();
  const { error, isLoading } = useQuery({ 
    queryKey: ['modules'], 
    queryFn: () => login(userCredentials.email, userCredentials.password), 
  });

  const modules = userData && userData.modules.sort((a, b) => a.id_module - b.id_module);
  const formattedModules = modules && formatModules(modules);

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent message={error.message} />

  return (
    <>
      { userData && 
        <div className="flex flex-1 items-center gap-8">
          <Menu 
            modules={formattedModules!}
            links={links}
            isMobile={false}
          />
          <Welcome />
        </div>
      }
    </>
  );
}
 
export default Home;