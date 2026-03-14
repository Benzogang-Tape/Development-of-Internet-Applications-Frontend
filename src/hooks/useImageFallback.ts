import { useState, useCallback } from "react";

export function useImageFallback() {
    const [imageError, setImageError] = useState(false);

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    const resetImageError = useCallback(() => {
        setImageError(false);
    }, []);

    return { imageError, handleImageError, resetImageError };
}
