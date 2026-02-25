import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';
import ResetPassword from './Components/Forgot/ResetPassword';
import TravelShareLayout from './Components/Main/Layout/TravelShareLayout';
import AllPosts from './Components/Main/Posts/AllPosts';
import FriendsPosts from './Components/Main/Posts/FriendsPosts';
import Followers from './Components/Main/UserControls/Follow/Followers';
import Following from './Components/Main/UserControls/Follow/Following';
import UserProfile from './Components/Main/UserControls/UserProfile/UserProfile';
import Navbar from './Components/Main/Navbar/Navbar';
import EditProfile from './Components/Main/UserControls/EditProfile/EditProfile';
import CreatePosts from './Components/Main/UserControls/CreatePosts/CreatePosts';
import Logout from './Components/Main/UserControls/Logout/Logout';
import NotFound from './Components/NotFound/NotFound';

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
        
        <Route path="/my-profile" element={
          <>
            <Navbar />
            <UserProfile />
          </>
        } />

        <Route path="/travel-share" element={<TravelShareLayout />}>
          <Route index element={<AllPosts />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="friends-posts" element={<FriendsPosts />} />
        </Route>
        
        <Route path='*' element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-posts" element={<CreatePosts />} />
          <Route path="/user-logout" element={<Logout />}/>
        </Routes>
      )}

    </div>
  );
}

export default App;