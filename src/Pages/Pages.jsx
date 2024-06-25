import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import Comunity from '../Components/Comunity/Comunity';
import Login from '../Components/LoginPage/Signin';
import Register from '../Components/LoginPage/Register';
import UserProfile from '../Components/ProfilePage/profile';
import Email from '../Components/ProfilePage/email';
import Password from '../Components/ProfilePage/password';
import DetailCommunity from '../Components/Comunity/DetailCommunity';
import { AuthProvider } from '../state/AuthProvider';
import ProtectedRoute from '../state/protected';
import SidebarProfile from '../Components/ProfilePage/sidebar';
import Calculator from '../Components/Calculator';

function Pages() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing-page" element={<ProtectedRoute element={<LandingPage />} > </ProtectedRoute>} />
          <Route path='/calculator' element={<ProtectedRoute element={<Calculator />} > </ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute element={<Comunity />}></ProtectedRoute>} />
          <Route path='/community/:id' element={<ProtectedRoute element={<DetailCommunity />}></ProtectedRoute>} />
          <Route path="/user-profile" element={<ProtectedRoute element={<SidebarProfile />}></ProtectedRoute>}>
            <Route path='/user-profile/' element={<ProtectedRoute element={<UserProfile />} ></ProtectedRoute>} />
            <Route path="/user-profile/email" element={<ProtectedRoute element={<Email></Email>}><Email /></ProtectedRoute>} />
            <Route path="/user-profile/password" element={<ProtectedRoute element={<Password />}></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Pages;
