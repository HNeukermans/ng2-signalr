import { ActivatedRouteMock } from './activated.route.mock';

describe("ActivatedRouteMock", () => {

    it("constructor should set snaphot", () => {
        let mock = new ActivatedRouteMock();
        expect(mock.snapshot).not.toBeNull(); 
    });
});