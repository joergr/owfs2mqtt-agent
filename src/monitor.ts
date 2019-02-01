import { OwfsWrapper } from './wrapper';
import { sleep } from './utils';
import { AsyncClient, connect } from 'async-mqtt';

export class Monitor1Wire {
  wrapper: OwfsWrapper;

  private monitoredDevices: string[] = [];
  mqttClient: AsyncClient;

  constructor(owfsAddress: string, owfsPort: string, mqttAddress: string, mqttPort: string, private interval: number) {
    this.wrapper = new OwfsWrapper(owfsAddress, owfsPort);
    this.mqttClient = connect(
      'tcp://' + mqttAddress + ':' + mqttPort,
      {}
    );

    this.mqttClient.on('connect', () => {
      console.log('mqtt connected');
    });

    this.mqttClient.subscribe('onewire/test', (data: any) => {
      console.log('subscribe: ' + data);
    });
  }

  private async initDevices() {
    const devices = (await this.wrapper.getAllDevices()) || [];

    for (const dev of devices) {
      // console.log('devices: ' + dev);
      const infos = await this.wrapper.getDeviceInfo(dev);
      if (infos.type === 'DS18B20') {
        console.log('found DS18B20 device at address: ' + dev);
        this.monitoredDevices.push(dev);
      }
    }
  }

  private async readData() {
    console.log('read data');

    for (const dev of this.monitoredDevices) {
      const temperature = await this.wrapper.readAttribute(dev, 'temperature');
      console.log('t: ' + temperature);
      await this.publish(dev, temperature);
    }

    await sleep(this.interval * 1000);
  }

  private async publish(device: string, temperature: string) {
    console.log('private async publish');
    const test = await this.mqttClient.publish(
      'onewire/' + device,
      JSON.stringify({
        temperature: +temperature
      })
    );
    console.log('test ' + test);
  }

  public async startMonitor() {
    try {
      await this.initDevices();

      if (this.monitoredDevices.length === 0) {
        console.log('no devices of type DS18B20 found ');
        return 'exit';
      }

      const stopInterrupt = false;
      while (!stopInterrupt) {
        await this.readData();
        // return 'done';
      }
    } finally {
      await this.mqttClient.end();
    }

    return 'Done';
  }
}
