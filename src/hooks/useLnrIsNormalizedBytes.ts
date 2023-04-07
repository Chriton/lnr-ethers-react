import { useEffect, useState } from "react";
import { lnr } from "../index";

/**
 * Checks if a name is normalized
 *
 * Examples:
 * ```typescript
 * const { isNormalizedBytes } = useLnrIsNormalizedBytes("0x307868616c000000000000000000000000000000000000000000000000000000");
 * const { isNormalizedBytes, error, hasError, loading } = useLnrIsNormalizedBytes("0x307868616c000000000000000000000000000000000000000000000000000000");
 * ```
 *
 * @param byteCode The byteCode of the name to check
 * @returns Whether the name is normalized
 */
export function useLnrIsNormalizedBytes(byteCode: string): {
    isNormalizedBytes: boolean;
    error: string | null;
    hasError: boolean;
    loading: boolean;
} {
    const [isNormalizedBytes, setIsNormalizedBytes] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);

    function getIsNormalizedBytes() {
        try {
            setLoading(true);
            const isNormalized = lnr.utils.isNormalizedBytes(byteCode);
            setIsNormalizedBytes(isNormalized);
            setError(null);
            setHasError(false);
        } catch (e) {
            setIsNormalizedBytes(false);
            setError(e.reason);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getIsNormalizedBytes();
    }, [byteCode]);

    return { isNormalizedBytes, error, hasError, loading };
}
