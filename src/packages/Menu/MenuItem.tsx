import React, { ReactNode, useState, useContext } from "react"
import classNames from "classnames"

import { MenuContext } from "./Menu"

export type MenuItemProps = {
    index?: number
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
    active?: boolean
}

const MenuItem: React.FC<MenuItemProps> = props => {
    const { index, className, style, children, active, disabled } = props

    const context = useContext(MenuContext)

    const classes = classNames("menu-item", className, {
        "is-active": context.index === index,
        "is-disabled": disabled,
    })

    const handleClick = () => {
        if ((index ?? false) && context.index !== index && !disabled) {
            context.onSelect(index!)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName = "MenuItem"

MenuItem.defaultProps = {
    disabled: false,
}

export default MenuItem
