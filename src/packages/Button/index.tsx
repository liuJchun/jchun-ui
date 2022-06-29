import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"
import classNames from "classnames"
import "./index.scss"

interface propsType {
    btnType: "link" | "primary" | "default"
    size: "large" | "middle" | "small"
    disabled: boolean
    href: string
    children: React.ReactNode
    className: string
}

type NativeButtonProps = propsType & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = propsType & AnchorHTMLAttributes<HTMLElement>

type ButtonPropsType = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonPropsType> = ({
    className,
    href,
    children,
    btnType,
    disabled,
    ...restProps
}) => {
    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        disabled: disabled
    })
    return (
        <>
            {href && btnType === "link" ? (
                <a href={href} {...restProps}>
                    {children}
                </a>
            ) : (
                <button className={classes} {...restProps}>
                    {children}
                </button>
            )}
        </>
    )
}

Button.defaultProps = {
    btnType: "default",
    disabled: false
}

export default Button
