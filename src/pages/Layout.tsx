import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { setNavigate } from "../config/axios.config";
import { useNavigate } from "react-router-dom";
const Layout: React.FC = () => {
  const navigate = useNavigate();
  setNavigate(navigate);
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
