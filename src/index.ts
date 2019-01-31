import { Monitor1Wire } from './monitor';

const interval = 2; // in sekunden

new Monitor1Wire('127.0.0.1', interval).startMonitor().then(res => {
  console.log('Ende: ' + res);
});
