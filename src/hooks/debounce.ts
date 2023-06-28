import {useEffect, useState} from "react";


export const useDebounce = (value: string, delay: number = 300) => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebounced(value), delay)
        return () => clearInterval(timeoutId)

    }, [value, delay])

    return debounced
}