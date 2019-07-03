import { APIHandler } from "./apiHandler";
import SignatureRequest from "../Entities/SignatureRequest";
import SignatureEntity from "../Entities/SignatureEntity";
import { replace } from "formik";

export interface ISignatureHandler {
    createSignature(entity: SignatureRequest) : Promise<SignatureEntity>;
    uploadSignature(file: FormData) : Promise<string>
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

    async uploadSignature(file: FormData) : Promise<string> {
        return await new Promise((resolve) => {
            const req = new XMLHttpRequest();
            req.open("POST", "http://localhost:64445/api/Signature/UploadSignature");
            req.send(file);
            resolve(req.response);
        })
    }

    async uploadInitials(file: FormData) : Promise<string> {
        return await new Promise((resolve) => {
            const req = new XMLHttpRequest();
            req.open("POST", "http://localhost:64445/api/Signature/UploadInitials");
            req.send(file);
            resolve(req.response);
        })
    }
}