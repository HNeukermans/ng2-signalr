
import { ActivatedRouteMock } from "../../src/services/index";

describe('ActivatedRouteMock', () => {

    it('constructor should set snaphot', () => {
        let mock = new ActivatedRouteMock();
        expect(mock.snapshot).not.toBeNull();
    });
});
