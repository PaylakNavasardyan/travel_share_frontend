import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration/Registration';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path={'/'}
          element = {
            <Registration />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
