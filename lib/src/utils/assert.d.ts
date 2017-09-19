/// <reference types="bignumber.js" />
import * as BigNumber from 'bignumber.js';
import * as Web3 from 'web3';
import { Web3Wrapper } from '../web3_wrapper';
import { Schema } from '0x-json-schemas';
export declare const assert: {
    isBigNumber(variableName: string, value: BigNumber.BigNumber): void;
    isUndefined(value: any, variableName?: string | undefined): void;
    isString(variableName: string, value: string): void;
    isHexString(variableName: string, value: string): void;
    isETHAddressHex(variableName: string, value: string): void;
    doesBelongToStringEnum(variableName: string, value: string, stringEnum: any): void;
    isSenderAddressAsync(variableName: string, senderAddressHex: string, web3Wrapper: Web3Wrapper): Promise<void>;
    isUserAddressAvailableAsync(web3Wrapper: Web3Wrapper): Promise<void>;
    hasAtMostOneUniqueValue(value: any[], errMsg: string): void;
    isNumber(variableName: string, value: number): void;
    isBoolean(variableName: string, value: boolean): void;
    isWeb3Provider(variableName: string, value: Web3.Provider): void;
    doesConformToSchema(variableName: string, value: any, schema: Schema): void;
    assert(condition: boolean, message: string): void;
    typeAssertionMessage(variableName: string, type: string, value: any): string;
};
