import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="max-w-[1200px] w-full flex flex-1 mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;