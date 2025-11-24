import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container className="text-center mt-5 pt-5">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Halaman Tidak Ditemukan</h2>
      <p className="lead">Maaf, layanan atau halaman yang anda cari tidak tersedia.</p>
      <Link href="/">
        <Button variant="primary" size="lg">Kembali ke Home</Button>
      </Link>
    </Container>
  );
}