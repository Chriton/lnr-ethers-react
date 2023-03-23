import { useState, useContext, useEffect } from "react";
import LNR from "../lnr/LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets the controller address set for a name
 *
 * Examples:
 * ```typescript
 * const { controller } = useLnrGetController("0xHal");
 * const { controller, error, hasError } = useLnrGetController("0xHal");
 * ```
 *
 * @param name The name to get the controller of
 * @returns The controller address set for the specified name
 */
export function useLnrGetController(name: string): {
    controller: string | null;
    error: string | null;
    hasError: boolean;
} {
    const [controller, setController] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    async function getController() {
        try {
            const controller = await lnr.getController(name);
            setController(controller);
            setError(null);
            setHasError(false);
        } catch (e) {
            setController(null);
            setError(e.reason);
            setHasError(true);
        }
    }

    useEffect(() => {
        getController();
    }, [name]);

    return { controller, error, hasError };
}
