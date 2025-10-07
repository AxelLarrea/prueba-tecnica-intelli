import { useUserStore } from "../../store/userStore";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import Hero from "./Hero";
import StatsSection from "./StatsSection";

const WelcomeSection = () => {
  const { userData } = useUserStore();
  
  const name = userData && capitalizeFirstLetter(userData.user.first_name)
  const lastName = userData && capitalizeFirstLetter(userData.user.last_name)
  return (
    <>
      { userData && 
        <div className="w-full h-full bg-background-secondary flex flex-1 flex-col items-center py-4 mx-auto lg:p-12">
          <Hero 
            name={name!} 
            lastName={lastName!}
          />

          <StatsSection />
        </div>
      }
    </>
  );
}
 
export default WelcomeSection;