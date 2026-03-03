import { Menu, type MenuItemConstructorOptions } from "electron";

interface RegisterApplicationMenuParams {
  onCheckForUpdates: () => void | Promise<void>;
}

const createMenuTemplate = ({
  onCheckForUpdates,
}: RegisterApplicationMenuParams): MenuItemConstructorOptions[] => {
  const template: MenuItemConstructorOptions[] = [];

  if (process.platform === "darwin") {
    template.push({ role: "appMenu" });
  }

  template.push(
    { role: "fileMenu" },
    { role: "editMenu" },
    { role: "viewMenu" },
    { role: "windowMenu" },
    {
      role: "help",
      submenu: [
        {
          label: "업데이트 확인...",
          click: () => {
            void onCheckForUpdates();
          },
        },
      ],
    }
  );

  return template;
};

// 메뉴 등록
export const registerApplicationMenu = (params: RegisterApplicationMenuParams) => {
  const menu = Menu.buildFromTemplate(createMenuTemplate(params));
  Menu.setApplicationMenu(menu);
};
