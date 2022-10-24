import React, { useState, createContext } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./MenuItem"
import "./style/index.scss"

type modeType = "vertical" | "horizontal"
type selectCallbackType = (selectedIndex: number) => void

export interface MenuProps {
    // activeIndex: number
    defaultIndex?: number
    mode?: modeType
    onSelect?: selectCallbackType
    className?: string
    style?: React.CSSProperties
    items?: any
    children?: React.ReactNode
}

export interface IMenuContext {
    index: number
    onSelect: selectCallbackType
    mode: modeType
}

export const MenuContext = createContext<IMenuContext>({
    index: 0,
    onSelect: () => {},
    mode: "horizontal",
})

const Menu: React.FC<MenuProps> = props => {
    const { className, style, defaultIndex, mode, children, onSelect } = props

    const [activeKey, setActiveKey] = useState<number>(defaultIndex!)

    const classes = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode === "horizontal",
    })
    const handleClick = (index: number) => {
        setActiveKey(index)
        onSelect?.(index)
    }

    const passedContext: IMenuContext = {
        index: activeKey ? activeKey : 0,
        onSelect: handleClick,
        mode: mode!,
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index: number) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, {
                    index,
                    ...childElement.props,
                })
                // return child
            } else {
                console.error("warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <div>
            <ul className={classes} style={style} data-testid="test-menu">
                <MenuContext.Provider value={passedContext}>
                    {renderChildren()}
                </MenuContext.Provider>
            </ul>
        </div>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal",
}

export default Menu
