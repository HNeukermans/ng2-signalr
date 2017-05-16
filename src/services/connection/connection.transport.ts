export class ConnectionTransport {
    public static get FOREVER_FRAME(): string { return 'foreverFrame'; }
    public static get LONG_POLLING(): string { return 'longPolling'; }
    public static get SERVER_SENT_EVENTS(): string { return 'serverSentEvents'; }
    public static get WEB_SOCKETS(): string { return 'webSockets'; }
}