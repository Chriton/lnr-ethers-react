import { ethers } from "ethers";
import { AbstractProvider } from "ethers/src.ts/providers/abstract-provider";

export interface LnrConfig {
    provider: ethers.AbstractProvider;
}
