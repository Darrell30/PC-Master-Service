'use client'

import { useEffect, useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function EditService({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    price: 0, 
    category: '', 
    imageUrl: '' 
  });

  useEffect(() => {
    fetch(`/api/services/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          description: data.description || '',
          price: data.price || 0,
          category: data.category || 'Rakit PC',
          imageUrl: data.imageUrl || ''
        });
      })
      .catch(err => console.error("Gagal ambil data:", err));
  }, [params.id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1000000) { 
        alert("Ukuran file terlalu besar! Maksimal 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/services/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Gagal update data');

      router.push('/services');
      router.refresh();
    } catch (error) {
      alert("Gagal mengupdate layanan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h3 className="mb-4">Edit Layanan</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Judul Layanan</Form.Label>
              <Form.Control 
                type="text" 
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gambar (Upload Baru / Edit URL)</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                className="mb-2"
              />
              <Form.Control 
                type="text" 
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} 
                placeholder="URL Gambar..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Select 
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
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
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
              />
            </Form.Group>
            
            <div className="d-flex gap-2">
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Perubahan'}
                </Button>
                <Button variant="secondary" onClick={() => router.back()} className="w-25">Batal</Button>
            </div>
          </Col>

          <Col md={4}>
            <Card className="text-center bg-light h-100">
              <Card.Body>
                <Card.Title className="mb-3">Preview Saat Ini</Card.Title>
                {form.imageUrl ? (
                  <img 
                    src={form.imageUrl} 
                    alt="Preview" 
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="text-muted py-5 border rounded">Tidak ada gambar</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}