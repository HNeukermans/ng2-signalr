export class GuidGenerator {


    public generate(): string {
        let guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        let hex = '0123456789abcdef';
        let r = 0;
        let guidResponse = '';
        for (let i = 0; i < 36; i++) {
            if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                // each x and y needs to be random
                r = Math.random() * 16 | 0;
            }
            if (guidHolder[i] === 'x') {
                guidResponse += hex[r];
            } else if (guidHolder[i] === 'y') {
                // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                r |= 0x8; // set pos 3 to 1 as 1???
                guidResponse += hex[r];
            } else {
                guidResponse += guidHolder[i];
            }
        }
        return guidResponse;
    }

    private decimalToHex(value: number): string {
        var hex = value.toString(16);
        while (hex.length < 2) {
            hex = '0' + hex;
        }
        return hex;
    }
}
