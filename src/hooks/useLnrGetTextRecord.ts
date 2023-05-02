import { useState, useContext, useEffect } from "react";
import LNR from "../lnr/LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets the specified text record associated with a name
 *
 * Examples:
 * ```typescript
 * const { textRecord } = useLnrGetTextRecord("0xhal", "contentcontract");
 * const { textRecord, error, hasError, loading } = useLnrGetTextRecord("0xhal", "contentcontract");
 * ```
 *
 * @param name The name to resolve the text record for
 * @param key The key of the text record to resolve
 * @returns The text record
 */
export function useLnrGetTextRecord(name: string, key: string): {
    textRecord: string | null;
    error: string | null;
    hasError: boolean;
    loading: boolean;
} {
    const [textRecord, setTextRecord] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    async function getTextRecord() {
        try {
            setLoading(true);
            const textRecord = await lnr.getTextRecord(name, key);
            setTextRecord(textRecord);
            setError(null);
            setHasError(false);
        } catch (e) {
            setTextRecord(null);
            setError(e.reason);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTextRecord();
    }, [name]);

    return { textRecord, error, hasError, loading };
}
