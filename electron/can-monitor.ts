import * as can from 'socketcan';

const network = can.parseNetworkDescription('./src/assets/can.kcd');
const channel = can.createRawChannel('vcan0', true);
const db = new can.DatabaseService(channel, network.buses['Bus']);

channel.start();

const signals = {
    'RPM': 0
}

db.messages['ECU_360'].signals['RPM'].onChange(function(s: can.Signal) {
    console.log('RPM changed to: ' + s.value);
    if (s.value !== undefined) {
        signals.RPM = s.value;
    }
});

export function getSignals() {
    return signals;
}