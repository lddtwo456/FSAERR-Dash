import '../App.css'
import { TelemetryProvider } from '../utilities/TelemetryProvider'
import ValueTile from './ValueTile'
import BoolTile from './BoolTile'

function App() {
  return (
    <>
      <h1>Dash</h1>
      <TelemetryProvider>
        <ValueTile title='Engine RPM' id='RPM' unit='rpm'></ValueTile>
        <BoolTile title='Oil Pressure' id='OilPressureLight'></BoolTile>
      </TelemetryProvider>
    </>
  )
}

export default App
