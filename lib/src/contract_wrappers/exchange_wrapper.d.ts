/// <reference types="bignumber.js" />
import * as BigNumber from 'bignumber.js';
import { Web3Wrapper } from '../web3_wrapper';
import { Order, OrderFillOrKillRequest, SignedOrder, ExchangeEvents, ContractEventEmitter, SubscriptionOpts, IndexedFilterValues, OrderCancellationRequest, OrderFillRequest, LogWithDecodedArgs, MethodOpts } from '../types';
import { ContractWrapper } from './contract_wrapper';
import { TokenWrapper } from './token_wrapper';
/**
 * This class includes all the functionality related to calling methods and subscribing to
 * events of the 0x Exchange smart contract.
 */
export declare class ExchangeWrapper extends ContractWrapper {
    private _exchangeContractIfExists?;
    private _exchangeLogEventEmitters;
    private _orderValidationUtils;
    private _tokenWrapper;
    private _exchangeContractErrCodesToMsg;
    private _contractAddressIfExists?;
    private static _getOrderAddressesAndValues(order);
    constructor(web3Wrapper: Web3Wrapper, tokenWrapper: TokenWrapper, contractAddressIfExists?: string);
    /**
     * Returns the unavailable takerAmount of an order. Unavailable amount is defined as the total
     * amount that has been filled or cancelled. The remaining takerAmount can be calculated by
     * subtracting the unavailable amount from the total order takerAmount.
     * @param   orderHash               The hex encoded orderHash for which you would like to retrieve the
     *                                  unavailable takerAmount.
     * @param   methodOpts              Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has either been filled or canceled.
     */
    getUnavailableTakerAmountAsync(orderHash: string, methodOpts?: MethodOpts): Promise<BigNumber.BigNumber>;
    /**
     * Retrieve the takerAmount of an order that has already been filled.
     * @param   orderHash    The hex encoded orderHash for which you would like to retrieve the filled takerAmount.
     * @param   methodOpts   Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has already been filled.
     */
    getFilledTakerAmountAsync(orderHash: string, methodOpts?: MethodOpts): Promise<BigNumber.BigNumber>;
    /**
     * Retrieve the takerAmount of an order that has been cancelled.
     * @param   orderHash    The hex encoded orderHash for which you would like to retrieve the
     *                       cancelled takerAmount.
     * @param   methodOpts   Optional arguments this method accepts.
     * @return  The amount of the order (in taker tokens) that has been cancelled.
     */
    getCanceledTakerAmountAsync(orderHash: string, methodOpts?: MethodOpts): Promise<BigNumber.BigNumber>;
    /**
     * Fills a signed order with an amount denominated in baseUnits of the taker token.
     * Since the order in which transactions are included in the next block is indeterminate, race-conditions
     * could arise where a users balance or allowance changes before the fillOrder executes. Because of this,
     * we allow you to specify `shouldThrowOnInsufficientBalanceOrAllowance`.
     * If false, the smart contract will not throw if the parties
     * do not have sufficient balances/allowances, preserving gas costs. Setting it to true forgoes this check
     * and causes the smart contract to throw (using all the gas supplied) instead.
     * @param   signedOrder                                 An object that conforms to the SignedOrder interface.
     * @param   fillTakerTokenAmount                        The amount of the order (in taker tokens baseUnits) that
     *                                                      you wish to fill.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance Whether or not you wish for the contract call to throw
     *                                                      if upon execution the tokens cannot be transferred.
     * @param   takerAddress                                The user Ethereum address who would like to fill this order.
     *                                                      Must be available via the supplied Web3.Provider
     *                                                      passed to 0x.js.
     * @return Transaction hash.
     */
    fillOrderAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber.BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, takerAddress: string): Promise<string>;
    /**
     * Sequentially and atomically fills signedOrders up to the specified takerTokenFillAmount.
     * If the fill amount is reached - it succeeds and does not fill the rest of the orders.
     * If fill amount is not reached - it fills as much of the fill amount as possible and succeeds.
     * @param   signedOrders                                The array of signedOrders that you would like to fill until
     *                                                      takerTokenFillAmount is reached.
     * @param   fillTakerTokenAmount                        The total amount of the takerTokens you would like to fill.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance Whether or not you wish for the contract call to throw if
     *                                                      upon execution any of the tokens cannot be transferred.
     *                                                      If set to false, the call will continue to fill subsequent
     *                                                      signedOrders even when some cannot be filled.
     * @param   takerAddress                                The user Ethereum address who would like to fill these
     *                                                      orders. Must be available via the supplied Web3.Provider
     *                                                      passed to 0x.js.
     * @return Transaction hash.
     */
    fillOrdersUpToAsync(signedOrders: SignedOrder[], fillTakerTokenAmount: BigNumber.BigNumber, shouldThrowOnInsufficientBalanceOrAllowance: boolean, takerAddress: string): Promise<string>;
    /**
     * Batch version of fillOrderAsync.
     * Executes multiple fills atomically in a single transaction.
     * If shouldThrowOnInsufficientBalanceOrAllowance is set to true, it will continue filling subsequent orders even
     * when earlier ones fail.
     * When shouldThrowOnInsufficientBalanceOrAllowance is set to false, if any fill fails, the entire batch fails.
     * @param   orderFillRequests                               An array of objects that conform to the
     *                                                          OrderFillRequest interface.
     * @param   shouldThrowOnInsufficientBalanceOrAllowance     Whether or not you wish for the contract call to throw
     *                                                          if upon execution any of the tokens cannot be
     *                                                          transferred. If set to false, the call will continue to
     *                                                          fill subsequent signedOrders even when some
     *                                                          cannot be filled.
     * @param   takerAddress                                    The user Ethereum address who would like to fill
     *                                                          these orders. Must be available via the supplied
     *                                                          Web3.Provider passed to 0x.js.
     * @return Transaction hash.
     */
    batchFillOrdersAsync(orderFillRequests: OrderFillRequest[], shouldThrowOnInsufficientBalanceOrAllowance: boolean, takerAddress: string): Promise<string>;
    /**
     * Attempts to fill a specific amount of an order. If the entire amount specified cannot be filled,
     * the fill order is abandoned.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Web3.Provider passed to 0x.js.
     * @return Transaction hash.
     */
    fillOrKillOrderAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber.BigNumber, takerAddress: string): Promise<string>;
    /**
     * Batch version of fillOrKill. Allows a taker to specify a batch of orders that will either be atomically
     * filled (each to the specified fillAmount) or aborted.
     * @param   orderFillOrKillRequests     An array of objects that conform to the OrderFillOrKillRequest interface.
     * @param   takerAddress                The user Ethereum address who would like to fill there orders.
     *                                      Must be available via the supplied Web3.Provider passed to 0x.js.
     * @return Transaction hash.
     */
    batchFillOrKillAsync(orderFillOrKillRequests: OrderFillOrKillRequest[], takerAddress: string): Promise<string>;
    /**
     * Cancel a given fill amount of an order. Cancellations are cumulative.
     * @param   order                   An object that conforms to the Order or SignedOrder interface.
     *                                  The order you would like to cancel.
     * @param   cancelTakerTokenAmount  The amount (specified in taker tokens) that you would like to cancel.
     * @return                          Transaction hash.
     */
    cancelOrderAsync(order: Order | SignedOrder, cancelTakerTokenAmount: BigNumber.BigNumber): Promise<string>;
    /**
     * Batch version of cancelOrderAsync. Atomically cancels multiple orders in a single transaction.
     * All orders must be from the same maker.
     * @param   orderCancellationRequests   An array of objects that conform to the OrderCancellationRequest
     *                                      interface.
     * @return Transaction hash.
     */
    batchCancelOrdersAsync(orderCancellationRequests: OrderCancellationRequest[]): Promise<string>;
    /**
     * Subscribe to an event type emitted by the Exchange smart contract
     * @param   eventName               The exchange contract event you would like to subscribe to.
     * @param   subscriptionOpts        Subscriptions options that let you configure the subscription.
     * @param   indexFilterValues       An object where the keys are indexed args returned by the event and
     *                                  the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param   exchangeContractAddress The hex encoded address of the Exchange contract to call.
     * @return                      ContractEventEmitter object
     */
    subscribeAsync(eventName: ExchangeEvents, subscriptionOpts: SubscriptionOpts, indexFilterValues: IndexedFilterValues, exchangeContractAddress: string): Promise<ContractEventEmitter>;
    /**
     * Stops watching for all exchange events
     */
    stopWatchingAllEventsAsync(): Promise<void>;
    /**
     * Retrieves the Ethereum address of the Exchange contract deployed on the network
     * that the user-passed web3 provider is connected to.
     * @returns The Ethereum address of the Exchange contract being used.
     */
    getContractAddressAsync(): Promise<string>;
    /**
     * Checks if order fill will succeed and throws an error otherwise.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Web3.Provider passed to 0x.js.
     */
    validateFillOrderThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber.BigNumber, takerAddress: string): Promise<void>;
    /**
     * Checks if cancelling a given order will succeed and throws an informative error if it won't.
     * @param   order                   An object that conforms to the Order or SignedOrder interface.
     *                                  The order you would like to cancel.
     * @param   cancelTakerTokenAmount  The amount (specified in taker tokens) that you would like to cancel.
     */
    validateCancelOrderThrowIfInvalidAsync(order: Order, cancelTakerTokenAmount: BigNumber.BigNumber): Promise<void>;
    /**
     * Checks if calling fillOrKill on a given order will succeed and throws an informative error if it won't.
     * @param   signedOrder             An object that conforms to the SignedOrder interface. The
     *                                  signedOrder you wish to fill.
     * @param   fillTakerTokenAmount    The total amount of the takerTokens you would like to fill.
     * @param   takerAddress            The user Ethereum address who would like to fill this order.
     *                                  Must be available via the supplied Web3.Provider passed to 0x.js.
     */
    validateFillOrKillOrderThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber.BigNumber, takerAddress: string): Promise<void>;
    /**
     * Checks if rounding error will be > 0.1% when computing makerTokenAmount by doing:
     * `(fillTakerTokenAmount * makerTokenAmount) / takerTokenAmount`.
     * 0x Protocol does not accept any trades that result in large rounding errors. This means that tokens with few or
     * no decimals can only be filled in quantities and ratios that avoid large rounding errors.
     * @param   fillTakerTokenAmount   The amount of the order (in taker tokens baseUnits) that you wish to fill.
     * @param   takerTokenAmount       The order size on the taker side
     * @param   makerTokenAmount       The order size on the maker side
     */
    isRoundingErrorAsync(fillTakerTokenAmount: BigNumber.BigNumber, takerTokenAmount: BigNumber.BigNumber, makerTokenAmount: BigNumber.BigNumber): Promise<boolean>;
    /**
     * Checks if logs contain LogError, which is emmited by Exchange contract on transaction failure.
     * @param   logsWithDecodedArgs   Transaction logs as returned by `zeroEx.awaitTransactionMinedAsync`
     */
    throwLogErrorsAsErrors(logsWithDecodedArgs: LogWithDecodedArgs[]): void;
    private _invalidateContractInstancesAsync();
    private _isValidSignatureUsingContractCallAsync(dataHex, ecSignature, signerAddressHex);
    private _getOrderHashHexUsingContractCallAsync(order);
    private _getExchangeContractAsync();
    private _getZRXTokenAddressAsync();
    private _getTokenTransferProxyAddressAsync();
}
