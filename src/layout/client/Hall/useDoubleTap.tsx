import { useRef, useCallback } from 'react';

const useDoubleTap = (callback: (event: React.TouchEvent) => void) => {
    const touchTimeout = useRef<NodeJS.Timeout | null>(null);

    const handler = useCallback((event: React.TouchEvent) => {
        if (!touchTimeout.current) {
            touchTimeout.current = setTimeout(() => {
                touchTimeout.current = null;
            }, 300);
        } else {
            clearTimeout(touchTimeout.current);
            touchTimeout.current = null;
            callback(event);
        }
    }, [callback]);

    return { onTouchEnd: handler };
};

export default useDoubleTap