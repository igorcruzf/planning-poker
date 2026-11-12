import {useCallback, useEffect, useRef, useState} from "react";

const ONE_SECOND_IN_MS = 1000

export function useCountdown(onFinish: () => void) {
    const [remaining, setRemaining] = useState<number | null>(null)
    const onFinishRef = useRef(onFinish)

    useEffect(() => {
        onFinishRef.current = onFinish
    }, [onFinish]);

    useEffect(() => {
        if (remaining === null) {
            return
        }
        const timeoutId = setTimeout(() => {
            if (remaining <= 1) {
                setRemaining(null)
                onFinishRef.current()
            } else {
                setRemaining(remaining - 1)
            }
        }, ONE_SECOND_IN_MS)

        return () => clearTimeout(timeoutId)
    }, [remaining]);

    const start = useCallback((seconds: number) => setRemaining(seconds), [])
    const cancel = useCallback(() => setRemaining(null), [])

    return {remaining, start, cancel}
}
