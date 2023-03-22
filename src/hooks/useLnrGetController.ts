import { useState, useContext, useEffect } from "react";
import LNR from "../LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets the controller address set for a name
 *
 * Example:
 * ```typescript
 * const { controller } = useLnrGetController("0xhal.og");
 * ```
 *
 * @param name The name to get the controller of
 * @returns The controller address set for the specified name
 */
export const useLnrGetController = (name: string): { controller: string | null } => {
    const [controller, setController] = useState(null);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    useEffect(() => {
        lnr.getController(name).then(setController).catch(console.error);
    }, [name]);

    return { controller };
};
