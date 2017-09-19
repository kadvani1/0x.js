/// <reference types="bignumber.js" />
import { SignedOrder, Order } from '../types';
import { TokenWrapper } from '../contract_wrappers/token_wrapper';
import { ExchangeWrapper } from '../contract_wrappers/exchange_wrapper';
export declare class OrderValidationUtils {
    private tokenWrapper;
    private exchangeWrapper;
    constructor(tokenWrapper: TokenWrapper, exchangeWrapper: ExchangeWrapper);
    validateFillOrderThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber.BigNumber, takerAddress: string, zrxTokenAddress: string): Promise<void>;
    validateFillOrKillOrderThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerTokenAmount: BigNumber.BigNumber, takerAddress: string, zrxTokenAddress: string): Promise<void>;
    validateCancelOrderThrowIfInvalidAsync(order: Order, cancelTakerTokenAmount: BigNumber.BigNumber, unavailableTakerTokenAmount: BigNumber.BigNumber): Promise<void>;
    validateFillOrderBalancesAllowancesThrowIfInvalidAsync(signedOrder: SignedOrder, fillTakerAmount: BigNumber.BigNumber, senderAddress: string, zrxTokenAddress: string): Promise<void>;
    private validateFillOrderMakerBalancesAllowancesThrowIfInvalidAsync(signedOrder, fillTakerAmount, zrxTokenAddress);
    private validateFillOrderTakerBalancesAllowancesThrowIfInvalidAsync(signedOrder, fillTakerAmount, senderAddress, zrxTokenAddress);
}
