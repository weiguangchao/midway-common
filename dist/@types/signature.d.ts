/// <reference types="node" />
export interface SignatureData {
    didUrl: string;
    address: string;
    signature: string;
    message: Buffer;
}
