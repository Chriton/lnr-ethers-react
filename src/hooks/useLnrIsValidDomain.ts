import { useEffect, useState } from "react";
import { lnr } from "../index";

/**
 * Checks if a name is a valid domain
 *
 * Examples:
 * ```typescript
 * const { isValidDomain } = useLnrIsValidDomain("0xhal.og");
 * const { isValidDomain, error, hasError, loading } = useLnrIsValidDomain("0xhal.og");
 * ```
 *
 * @param name The domain to check
 * @returns Whether the name is a valid domain
 */
export function useLnrIsValidDomain(name: string): {
    isValidDomain: boolean;
    error: string | null;
    hasError: boolean;
    loading: boolean;
} {
    const [isValidDomain, setIsValidDomain] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);

    function getIsValidDomain() {
        try {
            setLoading(true);
            const isValidDomain = lnr.utils.isValidDomain(name);
            setIsValidDomain(isValidDomain[0]);
            setError(null);
            setHasError(false);
        } catch (e) {
            setIsValidDomain(false);
            setError(e.reason);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getIsValidDomain();
    }, [name]);

    return { isValidDomain, error, hasError, loading };
}
