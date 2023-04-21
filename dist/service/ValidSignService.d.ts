/// <reference types="node" />
import { ILogger } from "@midwayjs/core";
import { SignatureData } from "../@types/signature";
import { Valid3Config } from "../@types/valid3";
import { HttpUtils } from "./HttpUtils";
export declare class ValidSignService {
    httpUtils: HttpUtils;
    logger: ILogger;
    valid3Config: Valid3Config;
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
        org: any;
    }>;
    private doParseContent;
    parseContentV2(content: string): Promise<{
        didUrl: any;
        address: string;
        message: Buffer;
        signature: any;
        org: any;
    }>;
}
