import { ISidebar } from "../../interfaces/layout";

export const sidebarData = (): ISidebar[] => {
  return [
    { id: "profile", text: "Perfil", route: "/profile" },
    {
      id: "distribuition-points",
      text: "Ponto de distribuição",
      route: "/",
    },
    { id: "shelters", text: "Abrigos", route: "/shelters" },
    { id: "options", text: "Outras opções", route: "#" },
  ];
};
