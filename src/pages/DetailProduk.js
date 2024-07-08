import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { firestore } from '../firebase'; // Pastikan path sesuai dengan lokasi file firebase.js

const DetailProduk = () => {
  const { id } = useParams(); // Ambil ID produk dari parameter URL
  const [produk, setProduk] = useState(null); // State untuk menyimpan data produk

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const produkRef = firestore.collection('produk').doc(id);
        const doc = await produkRef.get();
        if (!doc.exists) {
          console.log('Produk not found!');
        } else {
          setProduk(doc.data()); // Menyimpan data produk dari Firestore ke dalam state produk
        }
      } catch (error) {
        console.error('Error fetching produk: ', error);
      }
    };

    fetchProduk();
  }, [id]); // Pastikan efek hanya dijalankan saat ID berubah

  if (!produk) {
    return <Container className="mt-4">Loading...</Container>; // Tampilkan pesan loading jika produk belum dimuat
  }

  return (
    <Container className="mt-4">
      <h2>Detail Produk</h2>
      <Card>
        <Card.Img variant="top" src={produk.imageURL} className="product-image" />
        <Card.Body>
          <Card.Title>{produk.nama}</Card.Title>
          <Card.Text>{produk.deskripsi}</Card.Text>
          <Card.Text>Harga: ${produk.harga}</Card.Text>
          {/* Tambahan informasi atau tombol sesuai kebutuhan */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailProduk;