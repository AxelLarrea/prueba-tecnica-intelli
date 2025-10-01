import { useUserStore } from "../store/store";
import LoginForm from "../components/LoginForm";
import Welcome from "../components/Welcome";


const Home = () => {
  const { user } = useUserStore();

  if(user) console.log(user);
  return (
    <div>
      { user ? <Welcome /> : <LoginForm /> }
    </div>
  );
}
 
export default Home;