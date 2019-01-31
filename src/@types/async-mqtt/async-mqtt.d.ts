/// <reference types="node" />

declare module 'async-mqtt' {
  export class AsyncClient {
    constructor(client: any);
    addListener(...args: any[]): any;
    emit(...args: any[]): any;
    end(...args: any[]): any;
    eventNames(...args: any[]): any;
    getMaxListeners(...args: any[]): any;
    listenerCount(...args: any[]): any;
    listeners(...args: any[]): any;
    off(...args: any[]): any;
    on(...args: any[]): any;
    once(...args: any[]): any;
    prependListener(...args: any[]): any;
    prependOnceListener(...args: any[]): any;
    publish(...args: any[]): any;
    rawListeners(...args: any[]): any;
    removeAllListeners(...args: any[]): any;
    removeListener(...args: any[]): any;
    setMaxListeners(...args: any[]): any;
    subscribe(...args: any[]): any;
    unsubscribe(...args: any[]): any;
  }
  export function connect(brokerURL: any, opts: any): any;
}
