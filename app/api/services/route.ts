import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const services = await prisma.service.findMany();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newService = await prisma.service.create({
    data: {
      title: body.title,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      imageUrl: body.imageUrl || 'https://placehold.co/600x400?text=No+Image', // Default image jika kosong
    },
  });
  return NextResponse.json(newService);
}