import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
