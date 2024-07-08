import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { storage, firestore } from '../firebase'; // Sesuaikan path dengan lokasi file firebase.js

const AdminProduk = () => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [gambar, setGambar] = useState(null);
  const [kategori, setKategori] = useState('Mikrokontroler'); // Default kategori yang dipilih

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simpan gambar ke Firebase Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(gambar.name);
      await fileRef.put(gambar);

      // Dapatkan URL gambar dari Firebase Storage
      const imageURL = await fileRef.getDownloadURL();

      // Simpan data produk ke Firestore
      await firestore.collection('produk').add({
        nama,
        deskripsi,
        harga: parseInt(harga),
        imageURL,
        kategori // Menyimpan kategori yang dipilih
      });

      // Reset form setelah submit berhasil
      setNama('');
      setDeskripsi('');
      setHarga('');
      setGambar(null);
      setKategori('Mikrokontroler'); // Setel kembali kategori ke default
      alert('Produk berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Gagal menambahkan produk. Silakan coba lagi.');
    }
  };

  return (
    <div className="mt-4">
      <h2>Admin Produk</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="namaProduk">
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="deskripsiProduk">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control as="textarea" rows={3} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="hargaProduk">
          <Form.Label>Harga</Form.Label>
          <Form.Control type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="gambarProduk">
          <Form.Label>Gambar Produk</Form.Label>
          <Form.Control type="file" onChange={(e) => setGambar(e.target.files[0])} required />
        </Form.Group>

        <Form.Group controlId="kategoriProduk">
          <Form.Label>Kategori</Form.Label>
          <Form.Control as="select" value={kategori} onChange={(e) => setKategori(e.target.value)} required>
            <option value="Mikrokontroler">Mikrokontroler</option>
            <option value="IoT">IoT</option>
            <option value="Sensor">Sensor</option>
            <option value="Trainer SMK">Trainer SMK</option>
            {/* Tambahkan pilihan kategori lainnya di sini */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Simpan Produk
        </Button>
        <p>
        <Link to="/produk-list">
        <Button variant="info" className="mr-2">
          Lihat Daftar Produk
        </Button>
      </Link>
      </p>
      </Form>
    </div>
  );
};

export default AdminProduk;