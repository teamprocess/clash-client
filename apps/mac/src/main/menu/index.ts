import { BrowserWindow, Menu, type MenuItemConstructorOptions } from "electron";
import { resetWindowZoom, zoomInWindow, zoomOutWindow } from "../window/zoom";

interface RegisterApplicationMenuParams {
  onCheckForUpdates: () => void | Promise<void>;
}

const getFocusedWindow = () => BrowserWindow.getFocusedWindow();

const createViewMenu = (): MenuItemConstructorOptions => ({
  label: "View",
  submenu: [
    { role: "reload" },
    { role: "forceReload" },
    { role: "toggleDevTools" },
    { type: "separator" },
    {
      label: "100%",
      accelerator: "CommandOrControl+0",
      click: () => {
        resetWindowZoom(getFocusedWindow());
      },
    },
    {
      label: "확대",
      accelerator: "CommandOrControl+=",
      click: () => {
        zoomInWindow(getFocusedWindow());
      },
    },
    {
      label: "축소",
      accelerator: "CommandOrControl+-",
      click: () => {
        zoomOutWindow(getFocusedWindow());
      },
    },
    { type: "separator" },
    { role: "togglefullscreen" },
  ],
});

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
    createViewMenu(),
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
