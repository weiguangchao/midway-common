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
let ValidSignService = class ValidSignService {
    verifySignature(signatureData) {
        try {
            const { signature, message, address: originAddress } = signatureData;
            const { r, s, v } = (0, util_1.fromRpcSig)(signature);
            this.logger.debug('from sig: %s r: %s, s: %s, v: %s', signature, (0, util_1.bufferToHex)(r), (0, util_1.bufferToHex)(s), String(v));
            const msgHash = (0, util_1.hashPersonalMessage)(message);
            this.logger.debug('hash user message: %s, hash: %s', message, (0, util_1.bufferToHex)(msgHash));
            const pubkey = (0, util_1.ecrecover)(msgHash, v, r, s);
            const address = util_1.Address.fromPublicKey(pubkey).toString();
            const isOne = originAddress.toLowerCase() === address.toLowerCase();
            this.logger.debug('recevoer originAddress %s, address %s, equals %s', originAddress, address, isOne);
            const isValid = (0, util_1.isValidSignature)(v, r, s);
            this.logger.debug('is valid sig %s', isValid);
            return isValid && isOne;
        }
        catch (err) {
            this.logger.warn('verify signature error');
        }
        return false;
    }
    async parseContent(content) {
        const v1 = await this.parseContentV1(content);
        if (v1) {
            this.logger.debug('parse v1 message ----');
            return v1;
        }
        this.logger.debug('parse v2 message ===');
        return await this.parseContentV2(content);
    }
    async parseContentV1(content) {
        return await this.doParseContent(content, '----');
    }
    async doParseContent(content, split) {
        try {
            const data = content.split(split);
            let msg, didSig;
            if (data.length === 2) {
                msg = undefined;
                didSig = data[1].trim().split(',');
            }
            else {
                msg = data[0].trim();
                didSig = data[2].trim().split(',');
            }
            // parse address
            const didUrl = didSig[0];
            let originAddress = didUrl;
            if (!(0, crypto_1.isEthereumAddress)(didUrl)) {
                const did = await did_1.helpers.fromDid(didUrl);
                originAddress = did.identifier;
            }
            const messageBuf = (0, util_1.toBuffer)((0, utils_1.toBytes)(msg));
            const sigHex = didSig[1].trim().substring(4, didSig[1].length);
            // verify signature
            // const signatureBuf = toBuffer(sigHex);
            const signatureData = {
                didUrl,
                address: originAddress,
                message: messageBuf,
                signature: sigHex,
            };
            this.logger.debug('signatureData %j', signatureData);
            return signatureData;
        }
        catch (err) {
            this.logger.warn('parse content error');
        }
        return null;
    }
    async parseContentV2(content) {
        return await this.doParseContent(content, '===');
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], ValidSignService.prototype, "logger", void 0);
ValidSignService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton)
], ValidSignService);
exports.ValidSignService = ValidSignService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRTaWduU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL1ZhbGlkU2lnblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBUTBCO0FBQzFCLHlDQUE0RTtBQUM1RSwrQ0FBOEM7QUFDOUMsMkNBQW1EO0FBQ25ELHFDQUFzQztBQUsvQixJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUkzQixlQUFlLENBQUMsYUFJZjtRQUNDLElBQUk7WUFDRixNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBQ3JFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUEsaUJBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixrQ0FBa0MsRUFDbEMsU0FBUyxFQUNULElBQUEsa0JBQVcsRUFBQyxDQUFDLENBQUMsRUFDZCxJQUFBLGtCQUFXLEVBQUMsQ0FBQyxDQUFDLEVBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNWLENBQUM7WUFFRixNQUFNLE9BQU8sR0FBRyxJQUFBLDBCQUFtQixFQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNmLGlDQUFpQyxFQUNqQyxPQUFPLEVBQ1AsSUFBQSxrQkFBVyxFQUFDLE9BQU8sQ0FBQyxDQUNyQixDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBUyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sT0FBTyxHQUFHLGNBQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsTUFBTSxLQUFLLEdBQUcs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