import * as can from 'socketcan';

const network = can.parseNetworkDescription('./src/assets/can.kcd');
const channel = can.createRawChannel('vcan0', true);
const db = new can.DatabaseService(channel, network.buses['Bus']);

channel.start();

const signals: Record<string, number | undefined> = {};

// There might be 2 listeners per signal look into that if it becomes a problem smile
for (const message of Object.values(db.messages)) {
    for (const [signalName, signal] of Object.entries(message.signals)) {
        signal.onChange(function(s: can.Signal) {
            console.log(signalName + ' changed to: ' + s.value);
            if (s.value !== undefined) {
                signals[signalName] = s.value;
            }
        });
    }
}

export function getSignals() {
    return signals;
}