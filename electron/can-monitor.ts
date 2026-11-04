import * as can from 'socketcan';

const network = can.parseNetworkDescription('./src/assets/can.kcd');
const channel = can.createRawChannel('vcan0', true);
const db = new can.DatabaseService(channel, network.buses['Bus']);

channel.start();

const signals = {
    'RPM': 0,
    'OilPressureLight': false
}

db.messages['ECU_360'].signals['RPM'].onChange(function(s: can.Signal) {
    console.log('RPM changed to: ' + s.value);
    if (s.value !== undefined) {
        signals.RPM = s.value;
    }
});

db.messages['ECU_3E4'].signals['OilPressureLight'].onChange(function(s: can.Signal) {
    console.log('OilPressureLight changed to: ' + s.value);
    if (s.value !== undefined) {
        signals.OilPressureLight = Boolean(s.value);
    }
});

export function getSignals() {
    return signals;
}