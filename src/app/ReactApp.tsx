import { MainPage } from "@/pages/main/MainPage";
import { SidebarPage } from "@/pages/sidebar/SidebarPage";

import { SettingPage } from "@/pages/setting/SettingPage";
import { TodoPage } from "@/pages/todo/TodoPage";
import { ProviderRxdb } from "./providerRxdb";
4;
interface ReactAppProps {
  page: "main" | "sidebar" | "setting" | "todo";
}

export const ReactApp: React.FC<ReactAppProps> = ({ page }) => {
  const pages = {
    main: <MainPage />,
    sidebar: <SidebarPage />,
    setting: <SettingPage />,
    todo: <TodoPage />,
  };

  return (
    <>
      <ProviderRxdb>
        {pages[page]}
      </ProviderRxdb>
    </>
  );
};
