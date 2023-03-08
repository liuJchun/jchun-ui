import React, { FC, FunctionComponentElement, useContext, useState } from 'react'
import Transition from '../Transition'
import classNames from 'classnames'

import { MenuItemProps } from './MenuItem'
import { MenuContext } from './Menu'
import Icon from '../Icon'

export interface SubMenuProps {
    index?: number
    title: React.ReactNode
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}

const SubMenu: FC<SubMenuProps> = props => {
    const { title, children, style, className, index } = props
    const menuContext = useContext(MenuContext)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const classes = classNames('menu-item', 'sub-menu', className, {
        'is-active': menuContext.index === index,
    })

    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setIsOpen(toggle)
        }, 300)
    }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
    const clickEvents =
        menuContext.mode === 'vertical'
            ? {
                  onClick: handleClick,
              }
            : {}
    const hoverEvents =
        menuContext.mode !== 'vertical'
            ? {
                  onMouseEnter: (e: React.MouseEvent) => {
                      handleMouse(e, true)
                  },
                  onMouseLeave: (e: React.MouseEvent) => {
                      handleMouse(e, false)
                  },
              }
            : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('sub-menu-wrapper', {
            'menu-opened': isOpen,
            'sub-menu-horizontal': menuContext.mode === 'horizontal',
            'sub-menu-vertical': menuContext.mode === 'vertical',
        })
        const childrenElements = React.Children.map(
            children,
            (child: FunctionComponentElement<MenuItemProps>, i) => {
                if (child.type.displayName === 'MenuItem') {
                    return React.cloneElement(child, {
                        // index: 10 * index! + i,
                        ...child.props,
                    })
                } else {
                    console.error('warning: SubMenu has a child which is not a MenuItem component')
                }
            }
        )
        return (
            <Transition in={isOpen} timeout={300} classNames="zoom-in-top">
                <ul className={subMenuClasses}>{childrenElements}</ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} style={style} {...hoverEvents}>
            <div className="sub-menu-title" {...clickEvents}>
                {title}
                <Icon className="arrow-icon" icon="angle-down" />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
