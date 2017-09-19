/// <reference types="bignumber.js" />
import * as BigNumber from 'bignumber.js';
import { ExchangeWrapper } from './contract_wrappers/exchange_wrapper';
import { TokenRegistryWrapper } from './contract_wrappers/token_registry_wrapper';
import { EtherTokenWrapper } from './contract_wrappers/ether_token_wrapper';
import { TokenWrapper } from './contract_wrappers/token_wrapper';
import { TokenTransferProxyWrapper } from './contract_wrappers/token_transfer_proxy_wrapper';
import { ECSignature, Order, SignedOrder, Web3Provider, ZeroExConfig, TransactionReceiptWithDecodedLogs } from './types';
/**
 * The ZeroEx class is the single entry-point into the 0x.js library. It contains all of the library's functionality
 * and all calls to the library should be made through a ZeroEx instance.
 */
export declare class ZeroEx {
    /**
     * When creating an order without a specified taker or feeRecipient you must supply the Solidity
     * address null type (as opposed to Javascripts `null`, `undefined` or empty string). We expose
     * this constant for your convenience.
     */
    static NULL_ADDRESS: string;
    /**
     * An instance of the ExchangeWrapper class containing methods for interacting with the 0x Exchange smart contract.
     */
    exchange: ExchangeWrapper;
    /**
     * An instance of the TokenRegistryWrapper class containing methods for interacting with the 0x
     * TokenRegistry smart contract.
     */
    tokenRegistry: TokenRegistryWrapper;
    /**
     * An instance of the TokenWrapper class containing methods for interacting with any ERC20 token smart contract.
     */
    token: TokenWrapper;
    /**
     * An instance of the EtherTokenWrapper class containing methods for interacting with the
     * wrapped ETH ERC20 token smart contract.
     */
    etherToken: EtherTokenWrapper;
    /**
     * An instance of the TokenTransferProxyWrapper class containing methods for interacting with the
     * tokenTransferProxy smart contract.
     */
    proxy: TokenTransferProxyWrapper;
    private _web3Wrapper;
    private _abiDecoder;
    /**
     * Verifies that the elliptic curve signature `signature` was generated
     * by signing `data` with the private key corresponding to the `signerAddress` address.
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    static isValidSignature(data: string, signature: ECSignature, signerAddress: string): boolean;
    /**
     * Generates a pseudo-random 256-bit salt.
     * The salt can be included in an 0x order, ensuring that the order generates a unique orderHash
     * and will not collide with other outstanding orders that are identical in all other parameters.
     * @return  A pseudo-random 256-bit number that can be used as a salt.
     */
    static generatePseudoRandomSalt(): BigNumber.BigNumber;
    /**
     * Checks if the supplied hex encoded order hash is valid.
     * Note: Valid means it has the expected format, not that an order with the orderHash exists.
     * Use this method when processing orderHashes submitted as user input.
     * @param   orderHash    Hex encoded orderHash.
     * @return  Whether the supplied orderHash has the expected format.
     */
    static isValidOrderHash(orderHash: string): boolean;
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    static toUnitAmount(amount: BigNumber.BigNumber, decimals: number): BigNumber.BigNumber;
    /**
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    static toBaseUnitAmount(amount: BigNumber.BigNumber, decimals: number): BigNumber.BigNumber;
    /**
     * Computes the orderHash for a supplied order.
     * @param   order   An object that conforms to the Order or SignedOrder interface definitions.
     * @return  The resulting orderHash from hashing the supplied order.
     */
    static getOrderHashHex(order: Order | SignedOrder): string;
    /**
     * Instantiates a new ZeroEx instance that provides the public interface to the 0x.js library.
     * @param   provider    The Web3.js Provider instance you would like the 0x.js library to use for interacting with
     *                      the Ethereum network.
     * @param   config      The configuration object. Look up the type for the description.
     * @return  An instance of the 0x.js ZeroEx class.
     */
    constructor(provider: Web3Provider, config?: ZeroExConfig);
    /**
     * Sets a new web3 provider for 0x.js. Updating the provider will stop all
     * subscriptions so you will need to re-subscribe to all events relevant to your app after this call.
     * @param   provider    The Web3Provider you would like the 0x.js library to use from now on.
     */
    setProviderAsync(provider: Web3Provider): Promise<void>;
    /**
     * Get user Ethereum addresses available through the supplied web3 provider available for sending transactions.
     * @return  An array of available user Ethereum addresses.
     */
    getAvailableAddressesAsync(): Promise<string[]>;
    /**
     * Signs an orderHash and returns it's elliptic curve signature.
     * This method currently supports TestRPC, Geth and Parity above and below V1.6.6
     * @param   orderHash       Hex encoded orderHash to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the Web3.Provider supplied to 0x.js.
     * @return  An object containing the Elliptic curve signature parameters generated by signing the orderHash.
     */
    signOrderHashAsync(orderHash: string, signerAddress: string): Promise<ECSignature>;
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @return  Transaction receipt with decoded log args.
     */
    awaitTransactionMinedAsync(txHash: string, pollingIntervalMs?: number): Promise<TransactionReceiptWithDecodedLogs>;
    private _getTokenTransferProxyAddressAsync();
}
