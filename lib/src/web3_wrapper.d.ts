/// <reference types="bignumber.js" />
import * as Web3 from 'web3';
import * as BigNumber from 'bignumber.js';
import { Artifact } from './types';
export declare class Web3Wrapper {
    private web3;
    private defaults;
    private networkIdIfExists?;
    constructor(provider: Web3.Provider, defaults: Partial<Web3.TxData>);
    setProvider(provider: Web3.Provider): void;
    isAddress(address: string): boolean;
    isSenderAddressAvailableAsync(senderAddress: string): Promise<boolean>;
    getNodeVersionAsync(): Promise<string>;
    getTransactionReceiptAsync(txHash: string): Promise<Web3.TransactionReceipt>;
    getCurrentProvider(): Web3.Provider;
    getNetworkIdIfExistsAsync(): Promise<number | undefined>;
    getContractInstanceFromArtifactAsync<A extends Web3.ContractInstance>(artifact: Artifact, address?: string): Promise<A>;
    toWei(ethAmount: BigNumber.BigNumber): BigNumber.BigNumber;
    getBalanceInWeiAsync(owner: string): Promise<BigNumber.BigNumber>;
    doesContractExistAtAddressAsync(address: string): Promise<boolean>;
    signTransactionAsync(address: string, message: string): Promise<string>;
    getBlockTimestampAsync(blockHash: string): Promise<number>;
    getAvailableAddressesAsync(): Promise<string[]>;
    private getContractInstance<A>(abi, address);
    private getNetworkAsync();
}
