// TODO - import from ethers only what is needed to reduce bundle size
import {ethers} from "ethers";
import {ens_normalize} from "@adraffy/ens-normalize";


/**
 * Converts a bytes32 value, given as a hexadecimal string,
 * into a readable string representation
 *
 * Example:
 * ```
 * bytes32ToString("0x307868616c000000000000000000000000000000000000000000000000000000")
 * will return "0xhal"
 * ```
 *
 * @param {string} _hex A hexadecimal string representation of a bytes32 value
 * @returns {string} The string representation of the bytes32 value
 */
export function bytes32ToString(_hex: string): string {
    return ethers.toUtf8String(ethers.getBytes(_hex).filter((n) => n != 0));
}

/**
 * Converts a string to a bytes32 value represented as a hexadecimal string
 *
 * Example:
 * ```
 * stringToBytes32("0xhal")
 * will return "0x307868616c000000000000000000000000000000000000000000000000000000"
 * ```
 *
 * @param {string} _string The string to convert
 * @returns {string} The bytes32 value
 */
export function stringToBytes32(_string: string): string {
    let result = ethers.hexlify(ethers.toUtf8Bytes(_string));
    while (result.length < 66) {
        result += "0";
    }
    if (result.length !== 66) {
        throw new Error("invalid web3 implicit bytes32");
    }
    return result;
}

/**
 * Converts a domain string, such as "0xhal.og", into
 * a bytes32 value represented as a hexadecimal string
 *
 * Example:
 * ```
 * domainToBytes32("0xhal.og")
 * will return "0x307868616c000000000000000000000000000000000000000000000000000000"
 * ```
 *
 * @param _name The domain string
 * @returns The bytes32 value
 */
export function domainToBytes32(_name: string): string {
    let checkIsValid = isValidDomain(_name);
    if (checkIsValid[0] == false) {
        throw checkIsValid[1];
    } else {
        let normalized = checkIsValid[1];
        let nameOnly = normalized.slice(0, -3);
        return stringToBytes32(nameOnly);
    }
}

/**
 *
 * Converts a bytes32 value, given as a hexadecimal string, into a domain
 * string representation and also appending the ".og" top-level domain
 *
 * Example:
 * ```
 * bytes32ToDomain("0x307868616c000000000000000000000000000000000000000000000000000000")
 * will return "0xhal.og"
 * ```
 *
 * @param {string} _name The Bytes32 value to convert
 * @returns {string} Domain
 */
export function bytes32ToDomain(_name: string): string {
    return bytes32ToString(_name) + ".og";
}

/**
 * Uses [@adraffy/ens-normalize](https://www.npmjs.com/package/@adraffy/ens-normalize)
 * package to normalize a domain string
 *
 * Example:
 * ```
 * normalize("0xHal")
 * will return "0xhal"
 * ```
 *
 * @param _name The domain to normalize
 * @returns {string} The normalized domain
 */
export function normalize(_name: string): string {
    return ens_normalize(_name);
}

/**
 * Takes a domain string, normalizes it, checks that it is not a
 * subdomain, is an "og" domain, and verifies that isn't too long
 *
 * Example:
 * ```
 * isValidDomain("0xhal.og")
 * will return [true, "0xhal.og"]
 * ```
 *
 * @param _name The domain to check
 * @returns an array with the first element being a boolean indicating if the domain is valid,
 * and the second element being the normalized domain
 */
export function isValidDomain(_name: string): [boolean, string] {
    const byteSize = function (str: any) {
        return new Blob([str]).size;
    };
    if (!_name || _name.length == 0) return [false, "Empty string passed"];
    let normalized = normalize(_name);
    if (normalized.split(".").length - 1 > 1) {
        return [false, "Subdomains not supported at this time"];
    } else if (!normalized.endsWith(".og")) {
        return [false, "Domain does not end in .og"];
    } else if (byteSize(normalized) > 35) {
        return [false, "Domain too long"];
    } else {
        return [true, normalized];
    }
}

/**
 * Checks if a domain string is normalized
 *
 * Example:
 * ```
 * isNormalizedName("0xhal.og")
 * will return true
 * ```
 *
 * @param _name The domain to check
 * @returns {boolean} True if the domain is normalized, false otherwise
 */
export function isNormalizedName(_name: string): boolean {
    let validName = isValidDomain(_name);
    return validName[1] === _name;
}

/**
 * Checks if a bytes32 value representing a domain is normalized
 *
 * Example:
 * ```
 * isNormalizedBytes("0x307868616c000000000000000000000000000000000000000000000000000000")
 * will return true
 *
 * @param _bytes The bytes32 value of the domain to check
 * @returns {boolean} True if the domain is normalized, false otherwise
 */
export function isNormalizedBytes(_bytes: string): boolean {
    let validName = isValidDomain(bytes32ToDomain(_bytes));
    return domainToBytes32(validName[1]) === _bytes;
}
