import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Produk from './pages/Produk';
import Login from './pages/login';
import { Container } from 'react-bootstrap';
import Register from './pages/register';
import UserList from './admin/userlist';
import AdminProduk from './admin/adminProduk.js';
import ListProduk from './admin/ProdukList.js';
import ProfilePage from './pages/profile';
import DetailProduk from './pages/DetailProduk'; // Import halaman detail produk

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Produk />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/produk" element={<AdminProduk />} />
          <Route path="/admin/produklist" element={<ListProduk />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/produk/:id" element={<DetailProduk />} /> {/* Route untuk halaman detail produk */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Tambahkan rute untuk halaman lain */}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;