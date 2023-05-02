import { useState, useContext, useEffect } from "react";
import LNR from "../lnr/LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets all text records associated with a name
 *
 * Examples:
 * ```typescript
 * const { textRecords } = useLnrGetAllTextRecords("0xhal");
 * const { textRecords, error, hasError, loading } = useLnrGetAllTextRecords("0xhal");
 * ```
 *
 * @param name The name to resolve the text records for
 * @returns The text records
 */
export function useLnrGetAllTextRecords(name: string): {
    textRecords: any | null;
    error: string | null;
    hasError: boolean;
    loading: boolean;
} {
    const [textRecords, setTextRecords] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    async function getTextRecords() {
        try {
            setLoading(true);
            const textRecords = await lnr.getAllTextRecords(name);
            setTextRecords(textRecords);
            setError(null);
            setHasError(false);
        } catch (e) {
            setTextRecords(null);
            setError(e.reason);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTextRecords();
    }, [name]);

    return { textRecords, error, hasError, loading };
}
