import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"
import classNames from "classnames"
import "./index.scss"


interface propsType {
    btnType: "link" | "primary" | "default" | "danger" 
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
    size,
    disabled,
    ...restProps
}) => {
    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === 'link' && disabled
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
