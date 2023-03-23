import { useState, useContext, useEffect } from "react";
import LNR from "../lnr/LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets the address associated with a name
 *
 * Examples:
 * ```typescript
 * const { address } = useLnrGetAddress("0xhal.og");
 * const { address, error, hasError } = useLnrGetAddress("0xhal.og");
 * ```
 *
 * @param name The name to resolve to an address
 * @returns The address associated with the name
 */
export function useLnrGetAddress(name: string): {
    address: string | null;
    error: string | null;
    hasError: boolean;
} {
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    async function getAddress() {
        try {
            const address = await lnr.getAddress(name);
            setAddress(address);
            setError(null);
            setHasError(false);
        } catch (e) {
            setAddress(null);
            setError(e.reason);
            setHasError(true);
        }
    }

    useEffect(() => {
        getAddress();
    }, [name]);

    return { address, error, hasError };
}
