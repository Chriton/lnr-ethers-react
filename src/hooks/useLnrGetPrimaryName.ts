import { useState, useContext, useEffect } from "react";
import LNR from "../lnr/LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets the primary name set for an address
 *
 * Examples:
 * ```typescript
 * const { name } = useLnrGetPrimaryName("0x1234567890123456789012345678901234567890");
 * const { name, error, hasError, loading } = useLnrGetPrimaryName("0x1234567890123456789012345678901234567890");
 * ```
 *
 * @param address The address to get the primary name of
 * @returns The primary name set for the specified address
 */
export function useLnrGetPrimaryName(address: string): {
    name: string | null;
    error: string | null;
    hasError: boolean;
    loading: boolean;
} {
    const [name, setName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    async function getPrimaryName() {
        try {
            setLoading(true);
            const name = await lnr.getPrimaryName(address);
            setName(name);
            setError(null);
            setHasError(false);
        } catch (e) {
            setName(null);
            setError(e.reason);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPrimaryName();
    }, [address]);

    return { name, error, hasError, loading };
}
