import { RefObject, useEffect } from 'react'

export default function useClickOutside(refTarget: RefObject<HTMLElement>, handle: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const targetEle = event.target

            if (!refTarget.current || refTarget.current.contains(targetEle as HTMLElement)) {
                return
            }

            handle?.(event)
        }

        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('click', listener)
        }
    }, [refTarget, handle])
}
