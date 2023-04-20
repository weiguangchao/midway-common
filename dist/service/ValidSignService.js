"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidSignService = void 0;
const util_1 = require("@ethereumjs/util");
const core_1 = require("@midwayjs/core");
const utils_1 = require("@noble/hashes/utils");
const crypto_1 = require("@zcloak/crypto");
const did_1 = require("@zcloak/did");
const HttpUtils_1 = require("./HttpUtils");
let ValidSignService = class ValidSignService {
    verifySignature(signatureData) {
        try {
            const { signature, message, address: originAddress } = signatureData;
            const { r, s, v } = (0, util_1.fromRpcSig)(signature);
            this.logger.debug("from sig: %s r: %s, s: %s, v: %s", signature, (0, util_1.bufferToHex)(r), (0, util_1.bufferToHex)(s), String(v));
            const msgHash = (0, util_1.hashPersonalMessage)(message);
            this.logger.debug("hash user message: %s, hash: %s", message, (0, util_1.bufferToHex)(msgHash));
            const pubkey = (0, util_1.ecrecover)(msgHash, v, r, s);
            const address = util_1.Address.fromPublicKey(pubkey).toString();
            const isOne = originAddress.toLowerCase() === address.toLowerCase();
            this.logger.debug("recevoer originAddress %s, address %s, equals %s", originAddress, address, isOne);
            const isValid = (0, util_1.isValidSignature)(v, r, s);
            this.logger.debug("is valid sig %s", isValid);
            return isValid && isOne;
        }
        catch (err) {
            this.logger.warn("verify signature error");
        }
        return false;
    }
    async parseContent(content) {
        const v1 = await this.parseContentV1(content);
        if (v1) {
            this.logger.debug("parse v1 message ----");
            return v1;
        }
        this.logger.debug("parse v2 message ===");
        return await this.parseContentV2(content);
    }
    async parseContentV1(content) {
        return await this.doParseContent(content, "----");
    }
    async doParseContent(content, split) {
        try {
            const data = content.split(split);
            let msg, didSig;
            if (data.length === 2) {
                msg = undefined;
                didSig = data[1].trim().split(",");
            }
            else {
                msg = data[0].trim();
                didSig = data[2].trim().split(",");
            }
            // parse address
            // 1. didUrl 2.valid name 3.ethereum
            const address = didSig[0];
            let ethAddress = address;
            let didUrl = address;
            if (!(0, crypto_1.isEthereumAddress)(address)) {
                // didUrl
                if (address.startsWith("did:zk:")) {
                    const did = await did_1.helpers.fromDid(address);
                    ethAddress = did.identifier;
                }
                else {
                    const org = await this.httpUtils.get("https://valid3-service.valid3.id/api/org/profile", {
                        validName: address,
                    });
                    this.logger.debug("%s get org valid.id entity %j", didUrl, org);
                    // use valid name but not exists
                    if (!org) {
                        this.logger.warn("Valid name not found!");
                        return null;
                    }
                    didUrl = org.did;
                    const did = await did_1.helpers.fromDid(didUrl);
                    ethAddress = did.identifier;
                }
            }
            const messageBuf = (0, util_1.toBuffer)((0, utils_1.toBytes)(msg));
            const sigHex = didSig[1].trim().substring(4, didSig[1].length);
            // verify signature
            // const signatureBuf = toBuffer(sigHex);
            const signatureData = {
                didUrl,
                address: ethAddress,
                message: messageBuf,
                signature: sigHex,
            };
            this.logger.debug("signatureData %j", signatureData);
            return signatureData;
        }
        catch (err) {
            this.logger.warn("parse content error, split %s, content %s", split, content);
        }
        return null;
    }
    async parseContentV2(content) {
        return await this.doParseContent(content, "===");
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", HttpUtils_1.HttpUtils)
], ValidSignService.prototype, "httpUtils", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], ValidSignService.prototype, "logger", void 0);
ValidSignService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], ValidSignService);
exports.ValidSignService = ValidSignService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRTaWduU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL1ZhbGlkU2lnblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBUTBCO0FBQzFCLHlDQUE0RTtBQUM1RSwrQ0FBOEM7QUFDOUMsMkNBQW1EO0FBQ25ELHFDQUFzQztBQUV0QywyQ0FBd0M7QUFJakMsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFPM0IsZUFBZSxDQUFDLGFBSWY7UUFDQyxJQUFJO1lBQ0YsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxHQUFHLGFBQWEsQ0FBQztZQUNyRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFBLGlCQUFVLEVBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Ysa0NBQWtDLEVBQ2xDLFNBQVMsRUFDVCxJQUFBLGtCQUFXLEVBQUMsQ0FBQyxDQUFDLEVBQ2QsSUFBQSxrQkFBVyxFQUFDLENBQUMsQ0FBQyxFQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsSUFBQSwwQkFBbUIsRUFBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixpQ0FBaUMsRUFDakMsT0FBTyxFQUNQLElBQUEsa0JBQVcsRUFBQyxPQUFPLENBQUMsQ0FDckIsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLE9BQU8sR0FBRyxjQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pELE1B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