import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';
import ResetPassword from './Components/Forgot/ResetPassword';

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
          path={'/user-login'}
          element = {
            <Login />
          }
        />

        <Route 
          path={'/forgot-password'}
          element = {
            <Forgot />
          }
        />

        <Route 
          path={'/reset-password'}
          element = {
            <ResetPassword />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
