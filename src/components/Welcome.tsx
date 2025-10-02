import { useUserStore } from "../store/store";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const Welcome = () => {
  const { userData } = useUserStore();
  
  const name = userData && capitalizeFirstLetter(userData.user.first_name)
  const lastName = userData && capitalizeFirstLetter(userData.user.last_name)
  return (
    <>
      { userData && 
        <div className="w-full h-60 flex flex-col items-center gap-4 mx-auto">
          <h2 className="text-7xl text-primary-100 font-semibold">Bienvenido!</h2>
          <h3 className="text-4xl text-primary-500 font-semibold underline underline-offset-5">
            { name + ' ' + lastName }
          </h3>
        </div>
      }
    </>
  );
}
 
export default Welcome;