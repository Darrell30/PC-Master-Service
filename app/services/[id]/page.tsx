import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Container } from 'react-bootstrap';
import prisma from '@/lib/prisma';
import ServiceDetailCard from '@/app/components/ServiceDetailCard';

export default async function ServiceDetail({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service) return notFound();

  return <ServiceDetailCard service={service} />;
}

