import { GuidGenerator } from './guid.generator';
import { AadUrlConfig } from './aad.url.config';
export class AadUrlBuilder {

    private nonce: string;
    private tenant: string;
    private responseType: string;
    private clientId: string;
    private resource: string;
    private redirectUri: string;
    private state: string;
    private slice: string;
    private clientRequestId: string;
    private libVersion: string;
    private extraQueryParameter: string;
    private guidGenerator: GuidGenerator;
    public static MicrosoftLoginUrl: string = 'https://login.microsoftonline.com/';

    constructor(guidGenerator: GuidGenerator) {
        this.guidGenerator = guidGenerator;

        this.state = this.guidGenerator.generate();
        this.clientRequestId = this.guidGenerator.generate();
        this.responseType = 'id_token';
        this.libVersion = '1.0.0';
        this.redirectUri = window.location.href;
    }

    public with(options: AadUrlConfig): AadUrlBuilder {

        this.nonce = options.nonce;
        this.tenant = options.tenant;
        this.clientId = options.clientId;
        this.responseType = options.responseType || this.responseType;
        this.redirectUri = options.redirectUri || this.redirectUri;
        this.state = options.state;
        this.slice = options.slice || this.slice;
        this.clientRequestId = options.clientRequestId || this.clientRequestId;
        this.libVersion = options.libVersion || this.libVersion;
        this.extraQueryParameter = options.extraQueryParameter || this.extraQueryParameter;
        return this;
    }

    public build() {

        var urlNavigate = AadUrlBuilder.MicrosoftLoginUrl + this.tenant + '/oauth2/authorize';
        urlNavigate = urlNavigate + this.serialize() + this.addLibMetadata();
        urlNavigate = urlNavigate + '&nonce=' + encodeURIComponent(this.nonce);
        return urlNavigate;
    }

    private serialize(): string {

        var str: any = [];
        str.push('?response_type=' + this.responseType);
        str.push('client_id=' + encodeURIComponent(this.clientId));
        if (this.resource) {
            str.push('resource=' + encodeURIComponent(this.resource));
        }

        str.push('redirect_uri=' + encodeURIComponent(this.redirectUri));
        str.push('state=' + encodeURIComponent(this.state));

        if (this.slice) {
            str.push('slice=' + encodeURIComponent(this.slice));
        }

        if (this.extraQueryParameter) {
            str.push(this.extraQueryParameter);
        }

        // var correlationId = this.clientRequestId ? obj.correlationId : new GuidGenerator().generate();
        str.push('client-request-id=' + encodeURIComponent(this.clientRequestId));

        return str.join('&');
    };

    private addLibMetadata = function () {
        // x-client-SKU
        // x-client-Ver
        return '&x-client-SKU=Js&x-client-Ver=' + this.libVersion;
    };

}