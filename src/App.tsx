import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';
import ResetPassword from './Components/Forgot/ResetPassword';
import TravelShareLayout from './Components/Main/Layout/TravelShareLayout';
import AllPosts from './Components/Main/Posts/AllPosts';
import FriendsPosts from './Components/Main/Posts/FriendsPosts';
import Follow from './Components/Main/UserControls/Follow/Follow';

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="App">
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Registration />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/travel-share" element={<TravelShareLayout />}>
          <Route index element={<AllPosts />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="friends-posts" element={<FriendsPosts />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/follow" element={<Follow />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
