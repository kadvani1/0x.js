import * as Web3 from 'web3';
import { Web3Wrapper } from '../web3_wrapper';
import { Artifact } from '../types';
export declare class ContractWrapper {
    protected _web3Wrapper: Web3Wrapper;
    constructor(web3Wrapper: Web3Wrapper);
    protected _instantiateContractIfExistsAsync<A extends Web3.ContractInstance>(artifact: Artifact, addressIfExists?: string): Promise<A>;
}
