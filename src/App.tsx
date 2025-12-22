import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Forgot from './Components/Forgot/Forgot';
import ResetPassword from './Components/Forgot/ResetPassword';
import TravelShareLayout from './Components/Main/Layout/TravelShareLayout';
import AllPosts from './Components/Main/Posts/AllPosts';
import FriendsPosts from './Components/Main/Posts/FriendsPosts';
import MyPosts from './Components/Main/Posts/MyPosts';

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


        <Route path="/travel-share" element={<TravelShareLayout />}>
          <Route index element={<AllPosts />} />
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="friends-posts" element={<FriendsPosts />} />
          <Route path="my-posts" element={<MyPosts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
