import { useState } from "react";
import { useUserStore } from "../store/userStore";

const LoginForm = () => {
  const [isError, setIsError] = useState(false);
  const { isLoading, login } = useUserStore();
  const btnBorder = isError ? 'border-red-400' : 'border-primary-200'

  // TODO: agregar un notificador de errores

  const setBorderError = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;

    const email = (elements.namedItem('email') as HTMLInputElement).value;
    const password = (elements.namedItem('password') as HTMLInputElement).value;
    
    try {
      await login(email, password);
    } catch (error) {
      setBorderError()
      console.log(error)
    }
  }

  return (
    <form className="max-w-[400px] w-full flex flex-col gap-4 m-auto mt-8 p-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl text-primary-100 font-semibold text-center mb-4">Iniciar sesión</h2>

      <div className="flex flex-col">
        <label className="text-primary-300 font-semibold" htmlFor="email">Email</label>
        <input
          className="text-primary-200 outline-none border-b-1 border-primary-200 focus:border-primary-100 transition-[border] py-2"
          id="email"
          name="email"
          type="email" 
          placeholder="email@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-primary-300 font-semibold" htmlFor="password">Contraseña</label>
        <input 
          className="text-primary-200 outline-none border-b-1 border-primary-200 focus:border-primary-100 transition-[border] py-2"
          id="password" 
          name="password"
          type="password" 
          placeholder="****"
          required
        />
      </div>

      <button 
        className={`${btnBorder} text-primary-100 border-1 rounded-md cursor-pointer transition hover:border-primary-100 py-2`}
        type="submit"
      >
        { isLoading ? 
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-6 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div> : 
          'Iniciar sesión' 
        }
      </button>
    </form>
  );
}
 
export default LoginForm;