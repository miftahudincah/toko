import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { firestore } from '../firebase'; // Pastikan path sesuai dengan lokasi file firebase.js
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const Produk = () => {
  const [produk, setProduk] = useState([]); // Mendefinisikan state produk
  const [kategori, setKategori] = useState('Semua'); // State untuk kategori produk yang dipilih

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const produkRef = firestore.collection('produk');
        const snapshot = await produkRef.get();
        const produkList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProduk(produkList); // Menyimpan data produk dari Firestore ke dalam state produk
      } catch (error) {
        console.error('Error fetching produk: ', error);
      }
    };

    fetchProduk();
  }, []);

  // Mengatur perubahan kategori produk
  const handleKategoriChange = (kategori) => {
    setKategori(kategori);
  };

  // Menerapkan filter berdasarkan kategori yang dipilih
  const filteredProduk = kategori === 'Semua' ? produk : produk.filter(item => item.kategori === kategori);

  // Logika untuk mengarahkan ke halaman detail produk
  const handleLihatDetail = (id) => {
    // Contoh: Mengarahkan ke halaman detail produk menggunakan React Router
    // Menggunakan Link untuk navigasi ke halaman DetailProduk dengan parameter id produk
    return (
      <Link to={`/produk/${id}`} className="btn btn-primary">Lihat Detail</Link>
    );
  };

  return (
    <Container className="mt-4">
      <h2>Produk Kami</h2>
      <div className="mb-4">
        {/* Dropdown untuk memilih kategori produk */}
        <Dropdown className="mr-2">
          <Dropdown.Toggle variant="outline-primary" id="dropdown-kategori">
            Kategori: {kategori}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Opsi untuk memilih kategori produk */}
            <Dropdown.Item onClick={() => handleKategoriChange('Semua')}>Semua</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('Mikrokontroler')}>Mikrokontroler</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('IoT')}>IoT</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('Sensor')}>Sensor</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Trainer SMK</Dropdown.Header>
            <Dropdown.Item onClick={() => handleKategoriChange('Trainer SMK')}>Trainer otomotif</Dropdown.Item>
            {/* Tambahkan item dropdown untuk kategori Trainer SMK lainnya di sini */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* Menampilkan produk berdasarkan kategori yang dipilih */}
      <Row>
        {filteredProduk.map(item => (
          <Col key={item.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <div className="product-image-container">
                {/* Gambar produk dengan gaya untuk penyesuaian ukuran */}
                <Card.Img
                  variant="top"
                  src={item.imageURL}
                  className="product-image"
                  style={{ height: '300px', objectFit: 'cover' }} // Atur tinggi gambar dan penyesuaian ukuran di sini
                />
              </div>
              <Card.Body>
                <Card.Title>{item.nama}</Card.Title>
                <Card.Text>{item.deskripsi}</Card.Text>
                <Card.Text>Harga: ${item.harga}</Card.Text>
                {/* Tombol untuk melihat detail produk */}
                {handleLihatDetail(item.id)}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Produk;