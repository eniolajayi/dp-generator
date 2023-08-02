import Header from "./BaseHeader";
import Footer from "./BaseFooter";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
