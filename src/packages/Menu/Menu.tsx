import React, { useState, createContext } from "react"
import classNames from "classnames"
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
}
export const MenuContext = createContext<IMenuContext>({
    index: 0,
    onSelect: () => {},
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
    }
    return (
        <div>
            <ul className={classes} style={style} data-testid="test-menu">
                <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
            </ul>
        </div>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal",
}

export default Menu
