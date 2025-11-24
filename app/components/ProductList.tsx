'use client'

import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

// Interface disesuaikan dengan FakeStoreAPI
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductList({ products }: { products: Product[] }) {

  const KURS_DOLLAR = 16000;

  return (
    <Row xs={1} md={3} className="g-4">
      {products.map((product) => {

        const hargaRupiah = product.price * KURS_DOLLAR;

        return (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm border-0 h-100">
              <div className="p-4 bg-white d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.title}
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              </div>
              
              <Card.Body className="d-flex flex-column bg-light">
                <div className="mb-2">
                  <Badge bg="secondary" className="me-2">{product.category}</Badge>
                </div>

                <Card.Title className="fs-6 fw-bold text-dark" style={{ minHeight: '3rem' }}>
                  {product.title}
                </Card.Title>

                <h4 className="text-success fw-bold mt-2">
                  {hargaRupiah.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  })}
                </h4>

                <small className="text-muted">
                  (Est. ${product.price} USD)
                </small>

                <Card.Text className="text-muted small flex-grow-1 mt-3">
                  {product.description.length > 100 
                    ? product.description.substring(0, 100) + '...' 
                    : product.description}
                </Card.Text>

                <Button variant="primary" size="sm" className="w-100 mt-3">
                  Cek Ketersediaan Part
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}