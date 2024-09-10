import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { LoadingScreen } from "../components/common/LoadingScreen";

export function Layout() {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header openSidebar={() => setOpenSidebar(true)} />

      <Sidebar open={openSidebar} close={() => setOpenSidebar(false)} />

      <main className="flex-1 overflow-x-hidden px-4">
        <div className="m-auto max-w-7xl w-full mt-[100px]">
          <Outlet />
        </div>
      </main>

      <Footer className="mt-auto" />

      <LoadingScreen />
    </div>
  );
}
