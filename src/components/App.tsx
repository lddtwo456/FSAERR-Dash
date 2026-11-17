import '../App.css'
import { TelemetryProvider } from '../utilities/TelemetryProvider'
import ValueTile from './ValueTile'
import BoolTile from './BoolTile'

function App() {
  return (
    <>
      <h1>Dash</h1>
      <TelemetryProvider>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}>
          <ValueTile title='Battery Volts' id='BatteryVoltage' unit='V'></ValueTile>
          <ValueTile title='Air temp' id='AirTemp' unit='C'></ValueTile>
          <ValueTile title='RPM' id='RPM' unit='rpm'></ValueTile>
          <BoolTile title='Oil Pressure' id='OilPressureLight'></BoolTile>
        </div>
      </TelemetryProvider>
    </>
  )
}

export default App
