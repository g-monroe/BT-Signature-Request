import { APIHandler } from "./apiHandler";
import SignatureRequest from "../Entities/SignatureRequest";
import SignatureEntity from "../Entities/SignatureEntity";

export interface ISignatureHandler {
    createSignature(entity: SignatureRequest) : Promise<SignatureEntity>;
}

export class SignatureHandler implements ISignatureHandler {
    async createSignature(entity: SignatureRequest) : Promise<SignatureEntity> {
        return await APIHandler(`/api/Signature/AddSignature`, {
            headers: {"Content-Type" : "application/json"},
            method: "POST",
            data: entity,
            responseType: SignatureEntity
        });
    }
}