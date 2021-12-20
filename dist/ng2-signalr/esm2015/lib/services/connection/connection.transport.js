export class ConnectionTransport {
    constructor(name) {
        if (name == null || name === '') {
            throw new Error('Failed to create ConnectionTransport. Argument \'name\' can not be null or empty.');
        }
        this._name = name;
    }
    get name() {
        return this._name;
    }
    toString() {
        return this._name;
    }
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._name === other.name;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi50cmFuc3BvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItc2lnbmFsci9zcmMvbGliL3NlcnZpY2VzL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi50cmFuc3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLG1CQUFtQjtJQVE1QixZQUFZLElBQVk7UUFDcEIsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO1NBQ3hHO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQVRELElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBU00sUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQTBCO1FBQ3BDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDckMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25UcmFuc3BvcnQge1xyXG5cclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChuYW1lID09IG51bGwgfHwgbmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIENvbm5lY3Rpb25UcmFuc3BvcnQuIEFyZ3VtZW50IFxcJ25hbWVcXCcgY2FuIG5vdCBiZSBudWxsIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXF1YWxzKG90aGVyOiBDb25uZWN0aW9uVHJhbnNwb3J0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG90aGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWUgPT09IG90aGVyLm5hbWU7XHJcbiAgICB9XHJcbn1cclxuIl19