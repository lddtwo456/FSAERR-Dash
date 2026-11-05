import '../App.css'
import { TelemetryProvider } from '../utilities/TelemetryProvider'
import ValueTile from './ValueTile'
import BoolTile from './BoolTile'

function App() {
  return (
    <>
      <h1>Dash</h1>
      <TelemetryProvider>
        <ValueTile title='Battery Volts' id='BatteryVoltage' unit='V'></ValueTile>
        <ValueTile title='Air temp' id='AirTemp' unit='C'></ValueTile>
        <ValueTile title='RPM' id='RPM' unit='rpm'></ValueTile>
        <BoolTile title='Oil Pressure' id='OilPressureLight'></BoolTile>
      </TelemetryProvider>
    </>
  )
}

export default App
