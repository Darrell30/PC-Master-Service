'use client'

import { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Apakah anda yakin ingin menghapus layanan ini?')) {
      try {
        const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
        
        if (res.ok) {
          setServices(prevServices => prevServices.filter((s) => s.id !== id));
          alert("Data berhasil dihapus");
        } else {
          alert("Gagal menghapus data dari server. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Terjadi kesalahan koneksi.");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Daftar Layanan Servis & Rakit</h2>
          <p className="text-muted">Kelola layanan yang Anda tawarkan kepada pelanggan.</p>
        </div>
        <Link href="/services/create">
          <Button variant="success" size="lg">
            + Tambah Layanan Baru
          </Button>
        </Link>
      </div>
      
      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {services.map((service) => (
            <Col key={service.id}>
              <Card className="h-100 shadow-sm border-0">
                <div style={{ overflow: 'hidden', borderTopLeftRadius: 'calc(0.375rem - 1px)', borderTopRightRadius: 'calc(0.375rem - 1px)' }}>
                  <Card.Img 
                    variant="top" 
                    src={service.imageUrl || 'https://placehold.co/600x400?text=No+Image'} 
                    alt={service.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fw-bold mb-0 text-truncate" title={service.title}>
                      {service.title}
                    </Card.Title>
                    <Badge bg="info" className="text-dark">{service.category}</Badge>
                  </div>
                  
                  <h5 className="text-primary fw-bold my-2">
                    Rp {service.price.toLocaleString('id-ID')}
                  </h5>
                  
                  <Card.Text className="text-muted small flex-grow-1">
                    {service.description.length > 80 
                      ? service.description.substring(0, 80) + '...' 
                      : service.description}
                  </Card.Text>
                  
                  <div className="d-flex gap-2 mt-3 pt-3 border-top">
                    <Link href={`/services/${service.id}`} className="w-100">
                      <Button variant="outline-primary" className="w-100 btn-sm">Detail</Button>
                    </Link>
                    <Link href={`/services/edit/${service.id}`} className="w-100">
                       <Button variant="outline-warning" className="w-100 btn-sm">Edit</Button>
                    </Link>
                    <Button 
                      variant="outline-danger" 
                      className="w-100 btn-sm" 
                      onClick={() => handleDelete(service.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && services.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">Belum ada layanan yang tersedia.</p>
        </div>
      )}
    </div>
  );
}