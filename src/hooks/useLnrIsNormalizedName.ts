import { useEffect, useState } from "react";
import { lnr } from "../index";

/**
 * Checks if a name is normalized
 *
 * Examples:
 * ```typescript
 * const { isNormalizedName } = useLnrIsNormalizedName("0xhal.og");
 * const { isNormalizedName, error, hasError, loading } = useLnrIsNormalizedName("0xhal.og");
 * ```
 *
 * @param name The domain to check
 * @returns Whether the name is normalized
 */
export function useLnrIsNormalizedName(name: string): {
    isNormalizedName: boolean;
    error: string | null;
    hasError: boolean;
    loading: boolean;
} {
    const [isNormalizedName, setIsNormalizedName] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);

    function getIsNormalizedName() {
        try {
            setLoading(true);
            const isNormalized = lnr.utils.isNormalizedName(name);
            setIsNormalizedName(isNormalized);
            setError(null);
            setHasError(false);
        } catch (e) {
            setIsNormalizedName(false);
            setError(e.reason);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getIsNormalizedName();
    }, [name]);

    return { isNormalizedName, error, hasError, loading };
}
