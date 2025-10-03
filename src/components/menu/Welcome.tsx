import { useUserStore } from "../../store/userStore";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const Welcome = () => {
  const { userData } = useUserStore();
  
  const name = userData && capitalizeFirstLetter(userData.user.first_name)
  const lastName = userData && capitalizeFirstLetter(userData.user.last_name)
  return (
    <>
      { userData && 
        <div className="w-full h-60 flex flex-col items-center gap-4 mx-auto">
          <h2 className="text-5xl text-primary-100 font-semibold sm:text-7xl">Bienvenido!</h2>
          <h3 className="text-2xl text-primary-500 font-semibold underline underline-offset-5 sm:text-4xl">
            { name + ' ' + lastName }
          </h3>
        </div>
      }
    </>
  );
}
 
export default Welcome;