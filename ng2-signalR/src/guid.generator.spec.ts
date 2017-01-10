/// <reference path="./../node_modules/@types/jasmine/index.d.ts" />
import { GuidGenerator } from './guid.generator';

const GuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;

describe('GuidGenerator', () => {
    'use strict';

    it('should generate a guid', () => {
        const guid = new GuidGenerator().generate();
        expect(GuidRegex.test(guid)).toBe(true);
    });

    it('should generate unique values', () => {
        const guid1 = new GuidGenerator().generate();
        const guid2 = new GuidGenerator().generate();
        const guid3 = new GuidGenerator().generate();
        expect(guid1).not.toBe(guid2);
        expect(guid1).not.toBe(guid3);
        expect(guid2).not.toBe(guid3);
    });
});