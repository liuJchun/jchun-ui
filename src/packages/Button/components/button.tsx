import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"
import classNames from "classnames"
import "../style/index.scss"

interface propsType {
    btnType: "link" | "primary" | "default"
    size: "large" | "middle" | "small"
    disabled: boolean
    href: string
    children: React.ReactNode
    className: string
    style: React.CSSProperties
    danger: boolean
}

type NativeButtonProps = propsType & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = propsType & AnchorHTMLAttributes<HTMLElement>

type ButtonPropsType = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonPropsType> = ({
    className,
    href,
    children,
    btnType,
    size,
    disabled,
    danger,
    ...restProps
}) => {
    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        "btn-danger": danger,
        disabled: btnType === "link" && disabled,
    })
    return (
        <>
            {href && btnType === "link" ? (
                <a href={href} className={classes} {...restProps}>
                    {children}
                </a>
            ) : (
                <button className={classes} disabled={disabled} {...restProps}>
                    {children}
                </button>
            )}
        </>
    )
}

Button.defaultProps = {
    btnType: "default",
    size: "middle",
    disabled: false,
}

export default Button
