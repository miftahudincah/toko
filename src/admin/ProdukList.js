import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { firestore, storage } from '../firebase'; // Sesuaikan path dengan lokasi file firebase.js

const ListProduk = () => {
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore.collection('produk').get();
        const produkData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProdukList(produkData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduk = async (id, imageURL) => {
    try {
      // Hapus produk dari Firestore
      await firestore.collection('produk').doc(id).delete();

      // Hapus gambar dari Firebase Storage (opsional, tergantung kebutuhan)
      if (imageURL) {
        const storageRef = storage.refFromURL(imageURL);
        await storageRef.delete();
      }

      // Update state untuk memperbarui daftar produk setelah penghapusan
      setProdukList(prevList => prevList.filter(produk => produk.id !== id));
      alert('Produk berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting product: ', error);
      alert('Gagal menghapus produk. Silakan coba lagi.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Daftar Produk</h2>
      <Row>
        {produkList.map(produk => (
          <Col key={produk.id} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <div className="product-image-container">
                <Card.Img variant="top" src={produk.imageURL} className="product-image" />
              </div>
              <Card.Body>
                <Card.Title>{produk.nama}</Card.Title>
                <Card.Text>{produk.deskripsi}</Card.Text>
                <Card.Text>Harga: ${produk.harga}</Card.Text>
                <Button variant="danger" onClick={() => handleDeleteProduk(produk.id, produk.imageURL)}>Hapus</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListProduk;