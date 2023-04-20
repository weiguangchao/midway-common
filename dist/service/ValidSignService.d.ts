/// <reference types="node" />
import { ILogger } from "@midwayjs/core";
import { SignatureData } from "../@types/signature";
export declare class ValidSignService {
    logger: ILogger;
    verifySignature(signatureData: {
        address: string;
        signature: string;
        message: Buffer;
    }): boolean;
    parseContent(content: string): Promise<SignatureData>;
    parseContentV1(content: string): Promise<{
        didUrl: any;
        address: string;
        message: Buffer;
        signature: any;
    }>;
    private doParseContent;
    parseContentV2(content: string): Promise<{
        didUrl: any;
        address: string;
        message: Buffer;
        signature: any;
    }>;
}
