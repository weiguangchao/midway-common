import {
  Address,
  bufferToHex,
  ecrecover,
  fromRpcSig,
  hashPersonalMessage,
  isValidSignature,
  toBuffer,
} from "@ethereumjs/util";
import { ILogger, Inject, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { toBytes } from "@noble/hashes/utils";
import { isEthereumAddress } from "@zcloak/crypto";
import { helpers } from "@zcloak/did";
import { SignatureData } from "../@types/signature";

@Provide()
@Scope(ScopeEnum.Singleton)
export class ValidSignService {
  @Inject()
  logger: ILogger;

  verifySignature(signatureData: {
    address: string;
    signature: string;
    message: Buffer;
  }) {
    try {
      const { signature, message, address: originAddress } = signatureData;
      const { r, s, v } = fromRpcSig(signature);
      this.logger.debug(
        "from sig: %s r: %s, s: %s, v: %s",
        signature,
        bufferToHex(r),
        bufferToHex(s),
        String(v)
      );

      const msgHash = hashPersonalMessage(message);
      this.logger.debug(
        "hash user message: %s, hash: %s",
        message,
        bufferToHex(msgHash)
      );

      const pubkey = ecrecover(msgHash, v, r, s);
      const address = Address.fromPublicKey(pubkey).toString();
      const isOne = originAddress.toLowerCase() === address.toLowerCase();
      this.logger.debug(
        "recevoer originAddress %s, address %s, equals %s",
        originAddress,
        address,
        isOne
      );

      const isValid = isValidSignature(v, r, s);
      this.logger.debug("is valid sig %s", isValid);

      return isValid && isOne;
    } catch (err) {
      this.logger.warn("verify signature error");
    }
    return false;
  }

  async parseContent(content: string): Promise<SignatureData> {
    const v1 = await this.parseContentV1(content);
    if (v1) {
      this.logger.debug("parse v1 message ----");
      return v1;
    }
    this.logger.debug("parse v2 message ===");
    return await this.parseContentV2(content);
  }

  async parseContentV1(content: string) {
    return await this.doParseContent(content, "----");
  }

  private async doParseContent(content: string, split: string) {
    try {
      const data = content.split(split);

      let msg, didSig;

      if (data.length === 2) {
        msg = undefined;
        didSig = data[1].trim().split(",");
      } else {
        msg = data[0].trim();
        didSig = data[2].trim().split(",");
      }

      const didUrl = didSig[0];
      // maybe ethereum address or valid name
      let originAddress: string = didUrl;
      if (!isEthereumAddress(didUrl)) {
        // is didUrl
        if (didUrl.startsWith("did:zk:")) {
          const did = await helpers.fromDid(didUrl);
          originAddress = did.identifier;
        }
      }
      const messageBuf = toBuffer(toBytes(msg));

      const sigHex = didSig[1].trim().substring(4, didSig[1].length);
      // verify signature
      // const signatureBuf = toBuffer(sigHex);
      const signatureData = {
        didUrl,
        address: originAddress,
        message: messageBuf,
        signature: sigHex,
      };

      this.logger.debug("signatureData %j", signatureData);
      return signatureData;
    } catch (err) {
      this.logger.warn(
        "parse content error, split %s, content %s",
        split,
        content
      );
    }
    return null;
  }

  async parseContentV2(content: string) {
    return await this.doParseContent(content, "===");
  }
}
