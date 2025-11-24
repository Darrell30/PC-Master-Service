'use client'

import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4">Jasa Rakit & Servis PC</h1>
          <p className="lead"> Darrell Adrianne Cahyadi | 535240011 </p>
          <p className="text-muted">Jasa Rakit PC Gaming & Office serta Perbaikan Hardware</p>
          <Link href="/services">
            <Button variant="primary" size="lg">Lihat Layanan Kami</Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-5 justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Header>Rakitan & Servis</Card.Header>
            <Card.Body>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://geekawhat.com/wp-content/uploads/2024/07/FI_Cougar-FV270-RTX-4090-Build.jpg"
                    alt="Gaming Build"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  <Carousel.Caption style={{ textShadow: '1px 1px 2px #000' }}>
                    <h3>Ultimate Gaming Build</h3>
                    <p>Rakitan PC High-End dengan custom water cooling.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://scontent-cgk1-1.xx.fbcdn.net/v/t1.6435-9/86870635_133088761534875_8349282480573906944_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=nuDpe14qYS8Q7kNvwHqSBbk&_nc_oc=AdkE0a51TD6_kxDmqjWMOtwZT-LQcOB9m_hz0CRB_G34AlxDNKN1soBlQFAe_56MH7Y&_nc_zt=23&_nc_ht=scontent-cgk1-1.xx&_nc_gid=GGJFhNBEwk6Fi8QMGgoW1g&oh=00_AfisXuFXTr1c7Ys_AKFnqZqaD_KaanLwUerdJd_pe_1pgw&oe=694B4C7E"
                    alt="Office Setup"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  <Carousel.Caption style={{ textShadow: '1px 1px 2px #000' }}>
                    <h3>Office Productivity Setup</h3>
                    <p>Rakitan hemat daya untuk kebutuhan kantor.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://gamerzoneme.com/wp-content/uploads/2025/04/gaming-computer-service.jpg"
                    alt="Repair Service"
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  <Carousel.Caption style={{ textShadow: '1px 1px 2px #000' }}>
                    <h3>Deep Cleaning & Repair</h3>
                    <p>Layanan pembersihan debu dan ganti thermal paste.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}