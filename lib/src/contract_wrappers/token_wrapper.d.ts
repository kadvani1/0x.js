/// <reference types="bignumber.js" />
import * as BigNumber from 'bignumber.js';
import { Web3Wrapper } from '../web3_wrapper';
import { ContractWrapper } from './contract_wrapper';
import { TokenEvents, IndexedFilterValues, SubscriptionOpts, ContractEventEmitter, MethodOpts } from '../types';
/**
 * This class includes all the functionality related to interacting with ERC20 token contracts.
 * All ERC20 method calls are supported, along with some convenience methods for getting/setting allowances
 * to the 0x Proxy smart contract.
 */
export declare class TokenWrapper extends ContractWrapper {
    UNLIMITED_ALLOWANCE_IN_BASE_UNITS: BigNumber.BigNumber;
    private _tokenContractsByAddress;
    private _tokenLogEventEmitters;
    private _tokenTransferProxyContractAddressFetcher;
    constructor(web3Wrapper: Web3Wrapper, tokenTransferProxyContractAddressFetcher: () => Promise<string>);
    /**
     * Retrieves an owner's ERC20 token balance.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose balance you would like to check.
     * @param   methodOpts      Optional arguments this method accepts.
     * @return  The owner's ERC20 token balance in base units.
     */
    getBalanceAsync(tokenAddress: string, ownerAddress: string, methodOpts?: MethodOpts): Promise<BigNumber.BigNumber>;
    /**
     * Sets the spender's allowance to a specified number of baseUnits on behalf of the owner address.
     * Equivalent to the ERC20 spec method `approve`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who would like to set an allowance
     *                              for spenderAddress.
     * @param   spenderAddress      The hex encoded user Ethereum address who will be able to spend the set allowance.
     * @param   amountInBaseUnits   The allowance amount you would like to set.
     * @return Transaction hash.
     */
    setAllowanceAsync(tokenAddress: string, ownerAddress: string, spenderAddress: string, amountInBaseUnits: BigNumber.BigNumber): Promise<string>;
    /**
     * Sets the spender's allowance to an unlimited number of baseUnits on behalf of the owner address.
     * Equivalent to the ERC20 spec method `approve`.
     * Setting an unlimited allowance will lower the gas cost for filling orders involving tokens that forego updating
     * allowances set to the max amount (e.g ZRX, WETH)
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who would like to set an allowance
     *                              for spenderAddress.
     * @param   spenderAddress      The hex encoded user Ethereum address who will be able to spend the set allowance.
     * @return Transaction hash.
     */
    setUnlimitedAllowanceAsync(tokenAddress: string, ownerAddress: string, spenderAddress: string): Promise<string>;
    /**
     * Retrieves the owners allowance in baseUnits set to the spender's address.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose allowance to spenderAddress
     *                          you would like to retrieve.
     * @param   spenderAddress  The hex encoded user Ethereum address who can spend the allowance you are fetching.
     * @param   methodOpts      Optional arguments this method accepts.
     */
    getAllowanceAsync(tokenAddress: string, ownerAddress: string, spenderAddress: string, methodOpts?: MethodOpts): Promise<BigNumber.BigNumber>;
    /**
     * Retrieves the owner's allowance in baseUnits set to the 0x proxy contract.
     * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress    The hex encoded user Ethereum address whose proxy contract allowance we are retrieving.
     * @param   methodOpts      Optional arguments this method accepts.
     */
    getProxyAllowanceAsync(tokenAddress: string, ownerAddress: string, methodOpts?: MethodOpts): Promise<BigNumber.BigNumber>;
    /**
     * Sets the 0x proxy contract's allowance to a specified number of a tokens' baseUnits on behalf
     * of an owner address.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who is setting an allowance
     *                              for the Proxy contract.
     * @param   amountInBaseUnits   The allowance amount specified in baseUnits.
     * @return Transaction hash.
     */
    setProxyAllowanceAsync(tokenAddress: string, ownerAddress: string, amountInBaseUnits: BigNumber.BigNumber): Promise<string>;
    /**
     * Sets the 0x proxy contract's allowance to a unlimited number of a tokens' baseUnits on behalf
     * of an owner address.
     * Setting an unlimited allowance will lower the gas cost for filling orders involving tokens that forego updating
     * allowances set to the max amount (e.g ZRX, WETH)
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   ownerAddress        The hex encoded user Ethereum address who is setting an allowance
     *                              for the Proxy contract.
     * @return Transaction hash.
     */
    setUnlimitedProxyAllowanceAsync(tokenAddress: string, ownerAddress: string): Promise<string>;
    /**
     * Transfers `amountInBaseUnits` ERC20 tokens from `fromAddress` to `toAddress`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   fromAddress         The hex encoded user Ethereum address that will send the funds.
     * @param   toAddress           The hex encoded user Ethereum address that will receive the funds.
     * @param   amountInBaseUnits   The amount (specified in baseUnits) of the token to transfer.
     * @return Transaction hash.
     */
    transferAsync(tokenAddress: string, fromAddress: string, toAddress: string, amountInBaseUnits: BigNumber.BigNumber): Promise<string>;
    /**
     * Transfers `amountInBaseUnits` ERC20 tokens from `fromAddress` to `toAddress`.
     * Requires the fromAddress to have sufficient funds and to have approved an allowance of
     * `amountInBaseUnits` to `senderAddress`.
     * @param   tokenAddress        The hex encoded contract Ethereum address where the ERC20 token is deployed.
     * @param   fromAddress         The hex encoded user Ethereum address whose funds are being sent.
     * @param   toAddress           The hex encoded user Ethereum address that will receive the funds.
     * @param   senderAddress       The hex encoded user Ethereum address whose initiates the fund transfer. The
     *                              `fromAddress` must have set an allowance to the `senderAddress`
     *                              before this call.
     * @param   amountInBaseUnits   The amount (specified in baseUnits) of the token to transfer.
     * @return Transaction hash.
     */
    transferFromAsync(tokenAddress: string, fromAddress: string, toAddress: string, senderAddress: string, amountInBaseUnits: BigNumber.BigNumber): Promise<string>;
    /**
     * Subscribe to an event type emitted by the Token contract.
     * @param   tokenAddress        The hex encoded address where the ERC20 token is deployed.
     * @param   eventName           The token contract event you would like to subscribe to.
     * @param   subscriptionOpts    Subscriptions options that let you configure the subscription.
     * @param   indexFilterValues   An object where the keys are indexed args returned by the event and
     *                              the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @return ContractEventEmitter object
     */
    subscribeAsync(tokenAddress: string, eventName: TokenEvents, subscriptionOpts: SubscriptionOpts, indexFilterValues: IndexedFilterValues): Promise<ContractEventEmitter>;
    /**
     * Stops watching for all token events
     */
    stopWatchingAllEventsAsync(): Promise<void>;
    private _invalidateContractInstancesAsync();
    private _getTokenContractAsync(tokenAddress);
    private _getTokenTransferProxyAddressAsync();
}
