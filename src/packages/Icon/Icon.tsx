import React, { FC } from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { fas } from "@fortawesome/free-solid-svg-icons"

import "./style/index.scss"

library.add(fas as any)

// library(faStar)

export type themeType = "primary" | "secondary" | "success" | "info" | "warning" | "danger"

export interface IconProps extends FontAwesomeIconProps {
    theme?: themeType
}

const Icon: FC<IconProps> = props => {
    const { theme, className, ...restProps } = props
    const classes = classNames(className, {
        ["icon-theme-" + theme]: theme,
    })

    return <FontAwesomeIcon className={classes} {...restProps} />
}

Icon.defaultProps = {
    // theme: "primary",
}

export default Icon
