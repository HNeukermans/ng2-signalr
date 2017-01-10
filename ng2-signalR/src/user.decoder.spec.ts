import { UserDecoder } from './user.decoder';
import { Constants } from './constants';
import { AadProductionTokenSample, AadProductionUserProfileSample } from './scenario/a.production.aad.response';

describe('UserDecoder', () => {
    'use strict';

    beforeEach(() => {
        this.sut = new UserDecoder();
    });

    it('decode token string should return user instance', () => {

        let instance = this.sut.decode(AadProductionTokenSample);

        expect(instance.upn).toBe('guestone@hneu70532.onmicrosoft.com');
        expect(instance).toEqual(jasmine.objectContaining(AadProductionUserProfileSample));
    });

     it('decode undefined should throw error', () => {

        let action = () => this.sut.decode(undefined);

        expect(action).toThrow();
    });


});