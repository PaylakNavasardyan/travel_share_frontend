import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';

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

        <Route 
          path={'/Login'}
          element= {
            <Login />
          }
        />

        <Route 
          path={'/Forgot'}
          element= {
            <Forgot />
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
