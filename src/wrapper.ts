import { Client } from 'owfs';
import { IDeviceInfo } from './device-info';

export class OwfsWrapper {
  private client: Client;
  constructor(serverAddress: string) {
    this.client = new Client(serverAddress);
  }

  public getAllDevices() {
    return new Promise<string[]>(resolver => {
      this.client.dirall('/', (error: any, items) => {
        resolver(this.removeSlash(items));
      });
    });
  }

  public async getDeviceInfo(device: string) {
    // const attributes = await this.getDeviceAttribute(device);

    const attributes = ['type', 'address'];

    const result: { [attributeName: string]: string } = {};

    for (const attr of attributes) {
      const attrValue = await this.readAttribute(device, attr);
      result[attr] = attrValue;
      'fdfsd'.toString();
    }

    return {
      type: result['type'],
      address: result['address']
    } as IDeviceInfo;
  }

  public readAttribute(device: string, attribute: string) {
    return new Promise<string>(resolver => {
      this.client.read('/' + device + '/' + attribute, (error, result) => {
        resolver(result);
      });
    });
  }

  private getDeviceAttribute(device: string) {
    return new Promise<string[]>(resolver => {
      this.client.dirall('/' + device, (error, items) => {
        const prefixLenght = ('/' + device + '/').length;
        resolver(items.map(i => i.substring(prefixLenght)));
      });
    });
  }

  private removeSlash(input: string[]) {
    if (!input || input.length === 0) {
      return undefined;
    }

    return input.map(item => item.substring(1));
  }
}
