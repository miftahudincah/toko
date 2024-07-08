import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';

const Produk = () => {
  const [produk, setProduk] = useState([]);
  const [kategori, setKategori] = useState('Semua');

  useEffect(() => {
    // Daftar produk yang dihardcode tanpa API
    const produkList = [
      {
        id: 1,
        nama: 'Arduino Uno',
        deskripsi: 'Mikrokontroler populer untuk pemula.',
        harga: 10,
        image: 'https://i.ytimg.com/vi/zJ-LqeX_fLU/maxresdefault.jpg',
        kategori: 'Mikrokontroler'
      },
      {
        id: 2,
        nama: 'IoT Kit',
        deskripsi: 'Kit lengkap untuk memulai proyek IoT.',
        harga: 50,
        image: 'https://iot.institute.ufl.edu/wp-content/uploads/2022/05/IoT-Students-Club-Logo-01-e1654016152637.png',
        kategori: 'IoT'
      },
      {
        id: 3,
        nama: 'Sensor Ultrasonik',
        deskripsi: 'Sensor untuk mengukur jarak menggunakan gelombang ultrasonik.',
        harga: 5,
        image: 'https://tse4.mm.bing.net/th?id=OIP.myOnYHqLBHjmAo6gruDlcgHaD4&pid=Api&P=0&h=180',
        kategori: 'Sensor'
      },
      {
        id: 4,
        nama: 'Trainer',
        deskripsi: 'Trainer untuk belajar pemrograman mikrokontroler.',
        harga: 20,
        image: 'https://example.com/trainer-image.jpg',
        kategori: 'Trainer'
      }
      // Tambahkan produk lainnya di sini
    ];

    setProduk(produkList);
  }, []);

  const handleKategoriChange = (kategori) => {
    setKategori(kategori);
  };

  const filteredProduk = kategori === 'Semua' ? produk : produk.filter(item => item.kategori === kategori);

  return (
    <Container className="mt-4">
      <h2>Produk Kami</h2>
      <div className="mb-4">
        <Dropdown className="mr-2">
          <Dropdown.Toggle variant="outline-primary" id="dropdown-kategori">
            Kategori: {kategori}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleKategoriChange('Semua')}>Semua</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('Mikrokontroler')}>Mikrokontroler</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('IoT')}>IoT</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('Sensor')}>Sensor</Dropdown.Item>
            <Dropdown.Item onClick={() => handleKategoriChange('Trainer')}>Trainer</Dropdown.Item>
            {/* Tambahkan item dropdown untuk kategori lainnya di sini */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Row>
        {filteredProduk.map(item => (
          <Col key={item.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <div className="product-image-container">
                <Card.Img variant="top" src={item.image} className="product-image" />
              </div>
              <Card.Body>
                <Card.Title>{item.nama}</Card.Title>
                <Card.Text>{item.deskripsi}</Card.Text>
                <Card.Text>Harga: ${item.harga}</Card.Text>
                {/* Tambahkan tombol detail atau beli */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Produk;
