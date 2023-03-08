import { useState, useEffect } from 'react'

export default function useDebounce(value: any, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value)
        })
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debounceValue
}
