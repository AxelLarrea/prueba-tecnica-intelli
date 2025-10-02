import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] h-[75dvh] mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;