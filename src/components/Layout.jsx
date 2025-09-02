import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />       {/* Render Navbar once */}
      <div className="mt-4">
        <Outlet />      {/* Page content will render here */}
      </div>
    </>
  );
};

export default Layout;
