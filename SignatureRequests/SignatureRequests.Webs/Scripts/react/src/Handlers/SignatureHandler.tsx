import { APIHandler } from "./apiHandler";
import SignatureRequest from "../Entities/SignatureRequest";
import SignatureEntity from "../Entities/SignatureEntity";
import ExistsEntity from '../Entities/ExistsEntity';

export interface ISignatureHandler {
    createSignature(entity: SignatureRequest) : Promise<SignatureEntity>;
    uploadSignature(file: FormData) : Promise<string>;
    uploadInitials(file: FormData) : Promise<string>;
    downloadSignature(id: number) : Promise<FormData>;
    downloadInitials(id: number) : Promise<FormData>;
    signatureExists(id: number) : Promise<boolean>;
    initialExists(id: number) : Promise<boolean>;
}

export class SignatureHandler implements ISignatureHandler {
    
    async signatureExists(id: number): Promise<boolean> {
        const result = await APIHandler(`/api/Signature/HasSignature/${id}`, {
            headers: {"Content-Type" : "application/json"},
            method:'GET',
            responseType:ExistsEntity
        })
        return result.exists
    }

    async initialExists(id: number): Promise<boolean> {
        const result = await APIHandler(`/api/Signature/HasInitial/${id}`, {
            headers: {"Content-Type" : "application/json"},
            method:'GET',
            responseType:ExistsEntity
        })
        return result.exists
    }
    
    downloadSignature(id: number): Promise<FormData> {
        throw new Error("Method not implemented.");
    }
    
    downloadInitials(id: number): Promise<FormData> {
        throw new Error("Method not implemented.");
    }

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