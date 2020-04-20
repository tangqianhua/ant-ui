import { FC } from 'react';
import Menu, { IMenuProps } from './Menu';
import MenuItem, { MenuItemProps } from './MenuItem';
import SubMenu, { ISubMenuProps } from './SubMenu';

type MenuType = FC<IMenuProps> & {
  MenuItem: FC<MenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
};

const TransMenu: MenuType = Menu as MenuType;
TransMenu.MenuItem = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
