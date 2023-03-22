import { useState, useContext, useEffect } from "react";
import LNR from "../LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 * Gets the primary name set for an address
 *
 * Example:
 * ```typescript
 * const { name } = useLnrGetPrimaryName("0x1234567890123456789012345678901234567890");
 * ```
 *
 * @param address The address to get the primary name of
 * @returns The primary name set for the specified address
 */
export const useLnrGetPrimaryName = (address: string): { name: string | null } => {
    const [name, setName] = useState<string | null>(null);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    useEffect(() => {
        lnr.getPrimaryName(address).then(setName).catch(console.error);
    }, [address]);

    return { name };
};
