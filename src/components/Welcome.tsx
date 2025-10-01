import { useUserStore } from "../store/store";

const Welcome = () => {
  const { userData } = useUserStore();
  const { user } = userData;
  return (
    <>
      <h2>Bienvenido! {}</h2>
    </>
  );
}
 
export default Welcome;