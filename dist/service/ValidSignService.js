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
            let org = null;
            if (!(0, crypto_1.isEthereumAddress)(address)) {
                // didUrl
                if (address.startsWith("did:zk:")) {
                    const did = await did_1.helpers.fromDid(address);
                    ethAddress = did.identifier;
                }
                else {
                    org = await this.httpUtils.get(`${this.valid3Config.serviceUrl}/api/org/profile`, {
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
                org,
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
__decorate([
    (0, core_1.Config)("valid3"),
    __metadata("design:type", Object)
], ValidSignService.prototype, "valid3Config", void 0);
ValidSignService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], ValidSignService);
exports.ValidSignService = ValidSignService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRTaWduU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL1ZhbGlkU2lnblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBUTBCO0FBQzFCLHlDQU93QjtBQUN4QiwrQ0FBOEM7QUFDOUMsMkNBQW1EO0FBQ25ELHFDQUFzQztBQUd0QywyQ0FBd0M7QUFJakMsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFVM0IsZUFBZSxDQUFDLGFBSWY7UUFDQyxJQUFJO1lBQ0YsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxHQUFHLGFBQWEsQ0FBQztZQUNyRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFBLGlCQUFVLEVBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2Ysa0NBQWtDLEVBQ2xDLFNBQVMsRUFDVCxJQUFBLGtCQUFXLEVBQUMsQ0FBQyxDQUFDLEVBQ2QsSUFBQSxrQkFBVyxFQUFDLENBQUMsQ0FBQyxFQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDVixDQUFDO1lBRUYsTUFBTSxPQUFPLEdBQUcsSUFBQSwwQkFBbUIsRUFBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixpQ0FBaUMsRUFDakMsT0FBTyxFQUNQLElBQUEsa0JBQVcsRUFBQyxPQUFPLENBQUMsQ0FDckIsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQVMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLE9BQU8sR0FBRyxjQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pELE1B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