/// <reference path="./../node_modules/@types/jasmine/index.d.ts" />
import { AuthenticationContext } from './authentication.context';
import { LocalStorage } from './local.storage';
import { Navigator } from './navigator';
import { AadUrlBuilder } from './aad.url.builder';
import { AadLogoutUrlBuilder } from './aad.logout.url.builder';
import { GuidGenerator } from './guid.generator';
import { UserDecoder } from './user.decoder';
import { Constants } from './constants';
import { ATenantConfig, ATenantUrl } from './scenario/a.production.adal.config';
import { AadProductionTokenSample, AadProductionUserProfileSample } from './scenario/a.production.aad.response';
import * as _ from 'lodash';

describe('AuthenticationContext', () => {
    'use strict';

    beforeEach(() => {
        this.config = ATenantConfig;
        this.localStorage = new LocalStorage();
        this.navigator = new Navigator();
        this.guidGenerator = new GuidGenerator();
        this.aadUrlBuilder = new AadUrlBuilder(this.guidGenerator);
        this.aadLogoutUrlBuilder = new AadLogoutUrlBuilder();
        this.userDecoder = new UserDecoder();
    });

    beforeEach(() => {
        this.sut = new AuthenticationContext(
            this.config, this.localStorage, this.navigator,
            this.guidGenerator, this.aadUrlBuilder, this.userDecoder, this.aadLogoutUrlBuilder);
    });

    it('login should build the url', () => {

        spyOn(this.navigator, 'navigate');
        spyOn(this.aadUrlBuilder, 'with').and.callThrough();
        spyOn(this.aadUrlBuilder, 'build').and.callThrough();

        this.sut.login();

        expect(this.aadUrlBuilder.with).toHaveBeenCalledWith(jasmine.objectContaining(this.config));
        expect(this.aadUrlBuilder.build).toHaveBeenCalled();
    });

    it('login should navigate to aad url', () => {
        spyOn(this.navigator, 'navigate');
        spyOn(this.guidGenerator, 'generate').and.returnValue('xxx');

        this.sut.login();

        expect(this.navigator.navigate).toHaveBeenCalled();
        // expect(this.navigator.navigate).toHaveBeenCalledWith(ATenantUrl); //should create a  specific matcher gfor this
    });

    it('login should store its state', () => {
        spyOn(this.localStorage, 'setItem');
        spyOn(this.guidGenerator, 'generate').and.returnValue('xxx');
        spyOn(this.navigator, 'navigate');
        this.sut.login();

        expect(this.localStorage.setItem.calls.argsFor(0)).toEqual(jasmine.arrayContaining([Constants.STORAGE.LOGIN_REQUEST]));
        expect(this.localStorage.setItem.calls.argsFor(1)).toEqual([Constants.STORAGE.STATE_LOGIN, 'xxx']);
        expect(this.localStorage.setItem.calls.argsFor(2)).toEqual([Constants.STORAGE.NONCE_IDTOKEN, 'xxx']);
        expect(this.localStorage.setItem.calls.argsFor(3)).toEqual([Constants.STORAGE.LOGIN_ERROR, '']);
        expect(this.localStorage.setItem.calls.argsFor(4)).toEqual([Constants.STORAGE.ERROR, '']);
        expect(this.localStorage.setItem.calls.argsFor(5)).toEqual([Constants.STORAGE.ERROR_DESCRIPTION, '']);
    });

    it('getUser should decode idtoken in the storage ', () => {

        spyOn(this.localStorage, 'setItem').and.callFake(function () {
            return AadProductionTokenSample;
        });
        spyOn(this.userDecoder, 'decode').and.callThrough();

        let user = this.sut.getUser();

        expect(this.userDecoder.decode).toHaveBeenCalledWith(AadProductionTokenSample);
        expect(user).toEqual(AadProductionUserProfileSample);

    });

    it('getUser should return null if idtoken is empty', () => {

        spyOn(this.localStorage, 'getItem').and.callFake(function () {
            return '';
        });

        let user = this.sut.getUser();

        expect(user).toBe(null);

    });

    it('getUser should return null if idtoken is undefined', () => {

        spyOn(this.localStorage, 'getItem').and.callFake(function () {
            return <any>undefined;
        });
        let user = this.sut.getUser();

        expect(user).toBe(null);

    });

    it('getUser should return null if idtoken is null', () => {

        spyOn(this.localStorage, 'getItem').and.callFake(function () {
            return <any>null;
        });
        let user = this.sut.getUser();

        expect(user).toBe(null);

    });

    it('getUser should return null if idtoken is null', () => {

        spyOn(this.localStorage, 'getItem').and.callFake(function () {
            return '    ';
        });
        let user = this.sut.getUser();

        expect(user).toBe(null);

    });

    it('logout should clear state ', () => {

        spyOn(this.localStorage, 'setItem');
        spyOn(this.navigator, 'navigate');

        this.sut.logout();

        expect(this.localStorage.setItem.calls.argsFor(0)).toEqual([Constants.STORAGE.NONCE_IDTOKEN, '']);
        expect(this.localStorage.setItem.calls.argsFor(1)).toEqual([Constants.STORAGE.STATE_LOGIN, '']);
        expect(this.localStorage.setItem.calls.argsFor(2)).toEqual([Constants.STORAGE.IDTOKEN, '']);
    });

    it('logout should build url and navigate', () => {

        spyOn(this.aadLogoutUrlBuilder, 'with').and.callThrough();
        spyOn(this.aadLogoutUrlBuilder, 'build').and.returnValue('http://microsoft.com');
        spyOn(this.navigator, 'navigate');

        this.sut.logout();

        expect(this.aadLogoutUrlBuilder.with).toHaveBeenCalledWith(this.config.tenant, this.config.postLogoutRedirectUrl);
        expect(this.aadLogoutUrlBuilder.build).toHaveBeenCalled();
        expect(this.navigator.navigate).toHaveBeenCalledWith('http://microsoft.com');
    });

    it('getToken should call localStorage once', () => {
        spyOn(this.localStorage, 'getItem');
        spyOn(this.navigator, 'navigate');

        this.sut.getToken();
        expect(this.localStorage.getItem).toHaveBeenCalledWith(Constants.STORAGE.IDTOKEN);
        expect(this.localStorage.getItem).toHaveBeenCalledTimes(1);
    });
});