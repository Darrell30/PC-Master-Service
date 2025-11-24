'use client'

import { Card, Button, Container } from 'react-bootstrap';
import Link from 'next/link';

// Definisikan tipe data props
interface ServiceProps {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
}

export default function ServiceDetailCard({ service }: { service: ServiceProps }) {
  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        <Card.Header as="h5">Detail Layanan</Card.Header>
        <Card.Body>
          <Card.Title className="display-6">{service.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{service.category}</Card.Subtitle>
          <hr />
          <Card.Text className="lead">{service.description}</Card.Text>
          <h4 className="text-primary mt-4">Biaya: Rp {service.price.toLocaleString()}</h4>
          
          <div className="mt-5">
            <Link href="/services">
              <Button variant="secondary">Kembali ke List</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}