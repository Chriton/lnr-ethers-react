import { ethers, Contract } from "ethers";
import { Constants } from "../utils/Constants";

/**
 * {@link LNR} class provides access to the Linagee ecosystem of contracts:
 *
 * - LNR (original) - {@link https://etherscan.io/address/0x5564886ca2C518d1964E5FCea4f423b41Db9F561}
 * - LNR Wrapper    - {@link https://etherscan.io/address/0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7}
 * - LNR Resolver   - {@link https://etherscan.io/address/0x6023E55814DC00F094386d4eb7e17Ce49ab1A190}
 *
 * @class
 */
export default class LNR {

    /**
     * The {@link ethers.providers.BaseProvider} or {@link ethers.Signer} to use for the contract
     *
     * @private readonly
     */
    private readonly providerOrSigner: ethers.providers.BaseProvider | ethers.Signer

    /**
     * Creates a new {@link LNR} instance
     *
     * @constructor
     * @param provider The {@link ethers.providers.BaseProvider} or {@link ethers.Signer} to use
     * @returns A new {@link LNR} instance
     */
    constructor(provider: ethers.providers.BaseProvider | ethers.Signer) {
        this.providerOrSigner = provider;
    }

    /**
     * Gets an instance of the LNR Resolver {@link Contract}
     *
     * @private
     * @returns The LNR Resolver {@link Contract} instance
     */
    private getContract(): Contract {
        return new Contract(
            Constants.lnrResolverAddress,
            Constants.lnrResolverAbi,
            this.providerOrSigner
        );
    }

    /**
     * Converts a string address to a valid ethereum address
     *
     * If the provided string doesn't contain 0x, it will be added
     * It will also convert the string to lowercase and checksum it
     *
     * @param address The address to convert
     * @returns The converted address
     */
    private getAddressFromStr(address: string): string {
        return ethers.utils.getAddress(address);
    }

    /**
     * Gets the primary name set for an address
     *
     * Example:
     * ```typescript
     * const name = await lnr.getName("0x1234567890123456789012345678901234567890");
     * ```
     *
     * TODO - fix parseBytes32String (see lnr-ethers)
     *
     * @param address The address to get the primary name of
     * @returns The primary name set for the specified address
     */
    public async getPrimaryName(address: string): Promise<string> {
        const contract = this.getContract();
        const formattedAddress = this.getAddressFromStr(address)
        const bytesName = await contract.primary(formattedAddress);

        return ethers.utils.toUtf8String(ethers.utils.arrayify(bytesName).filter(n => n != 0));
    }

    /**
     * Gets the controller address set for a name
     *
     * Example:
     * ```typescript
     * const controller = await lnr.getController("0xhal.og");
     * ```
     *
     * @param name The name to get the controller of
     * @returns The controller address set for the specified name
     */
    public async getController(name: string): Promise<string> {
        const contract = this.getContract();
        const parsedName = ethers.utils.formatBytes32String(name);

        return await contract.controller(parsedName);
    }

    /**
     * Gets the address associated with a name
     *
     * Example:
     * ```typescript
     * const address = await lnr.getAddress("0xhal.og");
     * ```
     *
     * @param name The name to resolve to an address
     * @returns The address associated with the name
     */
    public async getAddress(name: string): Promise<string> {
        const contract = this.getContract();

        return await contract.resolve(name);
    }

    /**
     * Verifies that an address is the owner of a name
     *
     * TODO - fix formatBytes32String (see lnr-ethers)
     *
     * @param name The name to verify
     * @param address The address to verify
     * @returns True if the address is the owner of the name, false otherwise
     */
    public async verifyIsNameOwner(name: string, address: string): Promise<boolean> {
        const contract = this.getContract();
        const parsedName = ethers.utils.formatBytes32String(name);
        const parsedAddress = ethers.utils.getAddress(address);

        return await contract.verifyIsNameOwner(parsedName, parsedAddress);
    }
}
