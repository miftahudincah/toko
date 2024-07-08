import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Produk from './pages/Produk';
import Login from './pages/login'; // Import halaman login
import { Container } from 'react-bootstrap';
import Register from './pages/register';
import UserList from './admin/userlist'
import ProfilePage from './pages/profile'
const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Produk />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* Rute untuk halaman login */}
          {/* Tambahkan rute untuk halaman lain */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
