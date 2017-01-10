import { AuthenticationContext } from './authentication.context';
import { LocalStorage } from './local.storage';
import { Navigator } from './navigator';
import { AadUrlBuilder } from './aad.url.builder';
import { GuidGenerator } from './guid.generator';
import { Constants } from './constants';
import { UserDecoder } from './user.decoder';
import { AdalConfig } from './adal.config';
import { AadRedirectProcessor } from './aad.redirect.processor';
import { QueryStringDeserializer, hasAadProps } from './query.string.deserializer';
import { AadLogoutUrlBuilder } from './aad.logout.url.builder';


export class Authentication {

    constructor() {
    }

    public static getContext(configuration: AdalConfig): AuthenticationContext {

        console.log('getContext...');

        let context = new AuthenticationContext(
            configuration,
            new LocalStorage(),
            new Navigator(),
            new GuidGenerator(),
            new AadUrlBuilder(new GuidGenerator()),
            new UserDecoder(),
            new AadLogoutUrlBuilder());
        // TODO this.enableNativeLogging();
        return context;
    }

    public static getAadRedirectProcessor() {

        let p = new AadRedirectProcessor(
            new QueryStringDeserializer(),
            new UserDecoder(),
            new LocalStorage(),
            window);
        return p;
    }
}


