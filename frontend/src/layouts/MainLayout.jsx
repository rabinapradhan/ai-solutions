import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "../components/ChatWidget";

const MainLayout = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-primary-foreground
    
    text-white"
    >
      <Navbar />
      <Outlet />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default MainLayout;
