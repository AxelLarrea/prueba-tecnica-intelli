import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        <main className="w-full flex flex-1 px-4 mx-auto xl:px-0">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;