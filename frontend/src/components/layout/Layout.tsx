import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../style/Layout.css";

// Layout now renders shared chrome and leaves page content to the router Outlet.
const Layout = () => {
  return (
    <main className="main">
      <header className="header-container">
        <Header />
      </header>
      <section className="main-container">
        <Outlet />
      </section>
      <footer className="footer-container">
        <Footer />
      </footer>
    </main>
  );
};

export default Layout;