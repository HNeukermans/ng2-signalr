// all optional properties have generated defaults
export interface AadUrlConfig {
    nonce: string;
    tenant: string;
    clientId: string;
    responseType?: string;
    redirectUri?: string;
    state: string;
    slice?: string;
    clientRequestId?: string;
    libVersion?: string;
    extraQueryParameter?: string;
}