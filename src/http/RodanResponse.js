import { base64ToBuffer, bufferToString } from "../utils";

class RodanResponse {
    constructor(code, headers, body) {
        this._statusCode = code;
        this._headers = headers;
        this._body = body;
    }

    set statusCode(code) {
        this._statusCode = code;
    }

    bodyFromBase64 = base64Body => {
        const buffer = base64ToBuffer(base64Body);
        this._bodyAsString = bufferToString(buffer, 'utf-8');

    }

    get statusCode() {
        return this._statusCode;
    }

    set headers(headers) {
        this._headers = headers;
    }

    get headers() {
        return this._headers;
    }

    set body(body) {
        this._body = body;
    }

    get body() {
        return this._body;
    }

    getBodyAsJson = () => JSON.parse(this._bodyAsString);
    
}

export default RodanResponse;