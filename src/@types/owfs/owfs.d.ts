/// <reference types="node" />

declare module 'owfs' {
  export class Client {
    server: any;
    port: any;
    communication: any;

    constructor(server: any, port?: any, communication?: any);

    dir(path: any, callback: (error: any, items: string[]) => void): any;
    dirall(path: any, callback: (error: any, items: string[]) => void): void;
    dirallslash(path: any, callback: any): any;
    get(path: any, callback: any): any;
    getslash(path: any, callback: any): any;
    read(path: any, callback: (error: any, result: string) => void): any;
    write(path: any, payload: any, callback: any): any;
  }
}
