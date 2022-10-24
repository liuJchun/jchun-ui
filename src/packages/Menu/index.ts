import React from "react"
import MenuItem, { MenuItemProps } from "./MenuItem"
import SubMenu, { SubMenuProps } from "./SubMenu"
import Menu, { MenuProps } from "./Menu"

const TransMenu = Menu as React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>
    SubMenu: React.FC<SubMenuProps>
}

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu 

export default TransMenu
