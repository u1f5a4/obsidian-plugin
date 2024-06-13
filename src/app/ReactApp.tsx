import { MainPage } from "@/pages/main/MainPage";
import { ModalHandler } from "@/pages/modal/ModalHandler";
import { SettingPage } from "@/pages/setting/SettingPage";
import { SidebarPage } from "@/pages/sidebar/SidebarPage";
import { TodoPage } from "@/pages/todo/TodoPage";

import { ProviderRxdb } from "./providerRxdb";
4;
interface ReactAppProps {
  page: "main" | "sidebar" | "setting" | "todo" | "modal";
  type?: string;
  id?: string;
}

export const ReactApp: React.FC<ReactAppProps> = ({ page, type, id }) => {
  const pages = {
    main: <MainPage />,
    sidebar: <SidebarPage />,
    setting: <SettingPage />,
    todo: <TodoPage />,
    // TODO: fix string props
    modal: <ModalHandler type={`${type}`} id={`${id}`} />,
  };

  return (
    <>
      <ProviderRxdb>
        {pages[page]}
      </ProviderRxdb>
    </>
  );
};
