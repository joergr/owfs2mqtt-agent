import { Monitor1Wire } from './monitor';

const INTERVAL = process.env.INTERVAL || 2;
const BROKER_IP = process.env.BROKER_IP || '127.0.0.1';
const BROKER_PORT = process.env.BROKER_PORT || '1883';
const OWFS_IP = process.env.OWFS_IP || '127.0.0.1';
const OWFS_PORT = process.env.OWFS_PORT || '4304';

console.log('INTERVAL: ' + INTERVAL);
console.log('BROKER_IP: ' + BROKER_IP);
console.log('BROKER_PORT: ' + BROKER_PORT);
console.log('OWFS_IP: ' + OWFS_IP);
console.log('OWFS_PORT: ' + OWFS_PORT);

new Monitor1Wire(OWFS_IP, OWFS_PORT, BROKER_IP, BROKER_PORT, +INTERVAL).startMonitor().then(res => {
  console.log('Ende: ' + res);
});
