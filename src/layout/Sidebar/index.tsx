import React from "react";
import { Button, Image } from "../../components/common";
import { ModalConfirmAction } from "../../components/modals";
import { sidebarData } from "../../utils/layout/SidebarData";
import { BsChevronLeft } from "react-icons/bs";
import { useAuthProvider } from "../../context/Auth";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/logo.png";

interface ISidebarProps {
  open: boolean;
  close: () => void;
}

export function Sidebar({ open, close }: ISidebarProps) {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuthProvider();

  const [openModalLogout, setOpenModalLogout] = React.useState<boolean>(false);

  if (!currentUser) return null;

  return (
    <aside
      className={`
        fixed z-10 inset-0 top-0 left-0 w-screen h-screen
        flex justify-end transition-all
        ${open ? "visible bg-gray-100/30 backdrop-blur-sm" : "invisible"}
      `}
      onClick={close}
    >
      <div
        className={`
          h-full overflow-hidden flex flex-col
          w-full sm:w-[375px] p-4 transition ease 
          duration-[0.4s] bg-white relative
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex justify-center items-center min-h-20">
          <BsChevronLeft
            className="absolute left-0 top-1/2 -translate-y-1/2 text-lg cursor-pointer"
            onClick={close}
          />
          <div className="inline-flex gap-3">
            <div className={`flex justify-center h-full size-12`}>
              <Image alt="logo" src={logo} className="w-full object-contain" />
            </div>
            <p className="hidden self-center text-2xl font-semibold text-green-600 sm:flex">
              Coletivo Gloma
            </p>
          </div>
        </div>

        <div className="overflow-y-auto my-2 mb-14 not-scroll-bar">
          <ul
            className={`
              flex flex-col gap-2
            `}
          >
            {sidebarData().map((menu) => {
              const hasRequiredRole =
                !menu.roles ||
                menu.roles.some((role) => currentUser?.roles.includes(role));

              if (!currentUser?.roles.includes("admin") && !hasRequiredRole) return null;
              
              if (!currentUser?.roles.includes("coordinator") && menu.id === "register-demand-point") {
                return null;
              }
              return (
                <li key={`sidebar-menu-${menu.id}`}>
                  <Button
                    text={menu.text}
                    prefix={menu.icon}
                    className="bg-black w-full text-white justify-start"
                    onClick={() => {
                      navigate(menu.route || "");
                      close();
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <Button
            text={"Sair"}
            className="bg-black w-full text-white justify-start"
            onClick={() => setOpenModalLogout(true)}
          />
        </div>
      </div>

      <ModalConfirmAction
        title="Você tem certeza que deseja sair agora?"
        open={openModalLogout}
        close={() => setOpenModalLogout(false)}
        onSubmit={logout}
      />
    </aside>
  );
}
