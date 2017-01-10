import { GuidGenerator } from './guid.generator';
import { Storage } from './storage';
import { Constants, RequestTypes } from './constants';
import { Navigator } from './navigator';
import { AadUrlBuilder } from './aad.url.builder';
import { UserDecoder } from './user.decoder';
import { AdalConfig } from './adal.config';
import { AadLogoutUrlBuilder } from './aad.logout.url.builder';
import { User } from './user';

export class AuthenticationContext {

    private idTokenNonce: string;
    private instance: string;
    private loginInProgress: boolean;
    private config: AdalConfig;
    private storage: Storage;
    private navigator: Navigator;
    private guidGenerator: GuidGenerator;
    private aadUrlBuilder: AadUrlBuilder;
    private userDecoder: UserDecoder;
    private logoutUrlBuilder: AadLogoutUrlBuilder;
    private CONSTANTS = Constants;
    private REQUEST_TYPES = RequestTypes;

    constructor(
        config: AdalConfig, storage: Storage, navigator: Navigator, guidGenerator: GuidGenerator,
        aadUrlBuilder: AadUrlBuilder, userDecoder: UserDecoder, logoutUrlBuilder: AadLogoutUrlBuilder) {
        this.storage = storage;
        this.navigator = navigator;
        this.config = config;
        this.guidGenerator = guidGenerator;
        this.aadUrlBuilder = aadUrlBuilder;
        this.userDecoder = userDecoder;
        this.logoutUrlBuilder = logoutUrlBuilder;
    }

    public login(): void {
        if (this.loginInProgress) {
            this.info('Login in progress');
            return;
        }

        let urlConfig: any = this.cloneConfig(this.config);
        urlConfig.nonce = this.guidGenerator.generate();
        urlConfig.state = this.guidGenerator.generate();

        this.verbose('Expected state: ' + urlConfig.state + ' startPage:' + window.location);
        this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, (<any>window).location);
        this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, urlConfig.state);
        this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, urlConfig.nonce);
        this.storage.setItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
        this.storage.setItem(this.CONSTANTS.STORAGE.ERROR, '');
        this.storage.setItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');

        let url = this.aadUrlBuilder.with(urlConfig).build();

        this.navigator.navigate(url);

        this.loginInProgress = true;
    }

    public getUser(): User {
        let idtoken = this.storage.getItem(Constants.STORAGE.IDTOKEN);
        try {
            let user = this.userDecoder.decode(idtoken);
            return user;
        } catch (error) {
            if (console && console.debug) console.debug('getUser() returns null on catched error. Details >> ' + error.toString());
            return null;
        }
    }

    public getToken(): string {
        return this.storage.getItem(Constants.STORAGE.IDTOKEN);
    }

    public logout(): void {
        let idtoken = this.storage.getItem(Constants.STORAGE.IDTOKEN);
        if (idtoken === '') return null;

        this.storage.setItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, '');
        this.storage.setItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');
        this.storage.setItem(this.CONSTANTS.STORAGE.IDTOKEN, '');

        let url = this.logoutUrlBuilder.with(this.config.tenant, this.config.postLogoutRedirectUrl).build();

        this.navigator.navigate(url);
    }


    private verbose(message: string): void {

    }


    private info(message: string): void {

    }

    private createOptions(): any {
        return {
            nonce: this.idTokenNonce,
            tenant: this.config.tenant,
            clientId: this.config.clientId
        };
    }

    private cloneConfig(obj: any) {
        if (null === obj || 'object' !== typeof obj) {
            return obj;
        }

        var copy: any = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };

}
