/*
 * @Author: liujianchun
 * @Date: 2022-06-28 17:46:07
 * @LastEditTime: 2022-06-28 18:17:39
 * @LastEditors: your name
 * @Description:
 * @FilePath: \jchun-ui\src\packages\Button\index.tsx
 */

import type { FC } from "react"
import classNames from "classnames"

type propsType = {
    type: "link" | "primary" | "default"
    disabled: boolean
    href: string
}

const Button: FC<propsType> = ({ href, children, type }) => {
    const className = classNames("btn", { "btn-link": true })
    return <>{href ? <button className={className}>123</button> : null}</>
}

Button.defaultProps = {
    type: "link",
    disabled: false
}

export default Button
