import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import { FC } from 'react'

type animationType = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

export type TransitionProps = CSSTransitionProps & {
    children?: React.ReactNode
    animation?: animationType
    wrapper?: boolean
}

const Transition: FC<TransitionProps> = props => {
    const { children, classNames, animation, wrapper, ...restProps } = props

    return (
        <CSSTransition classNames={classNames || animation} {...restProps}>
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    appear: true,
    unmountOnExit: true,
    wrapper: false,
}
export default Transition
