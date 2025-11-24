'use client'

import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm sticky-top">
        <Container>
          <Navbar.Brand as={Link} href="/" className="fw-bold">
            PC Master Service
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              <Nav.Link 
                as={Link} 
                href="/" 
                active={pathname === '/'}
              >
                Home
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                href="/services" 
                active={pathname.startsWith('/services')}
              >
                Services
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                href="/explore" 
                active={pathname === '/explore'}
              >
                Explore Parts
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container style={{ minHeight: '80vh' }}>
        {children}
      </Container>
      
      <footer className="bg-light text-center py-4 mt-5 border-top">
        <Container>
          <p className="mb-0 text-muted small">
            &copy; {new Date().getFullYear()} PC Master Service. All Rights Reserved.
          </p>
        </Container>
      </footer>
    </>
  );
}