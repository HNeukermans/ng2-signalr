export class ConnectionStatus {
    constructor(value) {
        if (value == null || value < 0) {
            throw new Error('Failed to create ConnectionStatus. Argument \'name\' can not be null or empty.');
        }
        this._value = value;
    }
    get value() {
        return this._value;
    }
    get name() {
        return ConnectionStatus.names[Number(this._value.toString())];
    }
    toString() {
        return this.name;
    }
    equals(other) {
        if (other == null) {
            return false;
        }
        return this._value === other.value;
    }
}
ConnectionStatus.names = ['connecting', 'connected', 'reconnecting', '', 'disconnected'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5zdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItc2lnbmFsci9zcmMvbGliL3NlcnZpY2VzL2Nvbm5lY3Rpb24vY29ubmVjdGlvbi5zdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLGdCQUFnQjtJQWN6QixZQUFZLEtBQWE7UUFDckIsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3JHO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQWJELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUEsSUFBSSxJQUFJO1FBQ0wsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFTTSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBdUI7UUFDakMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDOztBQTVCYyxzQkFBSyxHQUFhLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25TdGF0dXMge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG5hbWVzOiBzdHJpbmdbXSA9IFsnY29ubmVjdGluZycsICdjb25uZWN0ZWQnLCAncmVjb25uZWN0aW5nJywgJycsICdkaXNjb25uZWN0ZWQnXTtcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gQ29ubmVjdGlvblN0YXR1cy5uYW1lc1tOdW1iZXIodGhpcy5fdmFsdWUudG9TdHJpbmcoKSldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA8IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIENvbm5lY3Rpb25TdGF0dXMuIEFyZ3VtZW50IFxcJ25hbWVcXCcgY2FuIG5vdCBiZSBudWxsIG9yIGVtcHR5LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVxdWFscyhvdGhlcjogQ29ubmVjdGlvblN0YXR1cyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvdGhlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlID09PSBvdGhlci52YWx1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=