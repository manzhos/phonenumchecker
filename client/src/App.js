import './App.css';
import { PhoneForm } from './component/PhoneForm'

function App() {
  return (
    <div className="App">
      <div>
      	<h1>Verify phone</h1>
        {<PhoneForm/>}
      </div>
    </div>
  );
}

export default App;
