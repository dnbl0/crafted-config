import { ModalDataType, MainMenuItem } from "../types/PrimaryNav.types";

export const getEncoreMenu = (mainMenu: MainMenuItem | undefined) =>
  mainMenu?.menus.find((modal) => modal.type === ModalDataType.ENCORE);

export const getLevel1Menus = (mainMenu: MainMenuItem | undefined) =>
  mainMenu?.menus.filter((modal) => modal.type !== ModalDataType.ENCORE);
