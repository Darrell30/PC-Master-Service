'use client'

import { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function CreateService() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    category: 'Rakit PC',
    imageUrl: '' 
  });

  // Fungsi mengubah File menjadi Base64 (Text)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1000000) { // Batas 1MB agar database tidak berat
        alert("Ukuran file terlalu besar! Maksimal 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Gagal menyimpan data');

      router.push('/services');
      router.refresh();
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4">Tambah Layanan Baru</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Judul Layanan</Form.Label>
              <Form.Control 
                type="text" 
                required 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gambar (Upload File atau URL)</Form.Label>
              
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                className="mb-2"
              />
              <div className="text-center text-muted mb-2">- ATAU -</div>
              
              <Form.Control 
                type="text" 
                placeholder="Masukkan Link URL Gambar..."
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} 
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                 <Form.Group className="mb-3">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Select onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option>Rakit PC</option>
                    <option>Servis Hardware</option>
                    <option>Install Ulang OS</option>
                    <option>Cleaning</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Harga (Rp)</Form.Label>
                  <Form.Control 
                    type="number" 
                    required 
                    onChange={(e) => setForm({ ...form, price: e.target.value })} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                required 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Layanan'}
            </Button>
          </Col>

          <Col md={4}>
            <Card className="text-center bg-light">
              <Card.Body>
                <Card.Title className="mb-3">Preview Gambar</Card.Title>
                {form.imageUrl ? (
                  <img 
                    src={form.imageUrl} 
                    alt="Preview" 
                    className="img-fluid rounded shadow-sm" 
                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="text-muted py-5 border rounded">No Image</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}