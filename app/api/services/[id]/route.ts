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
      imageUrl: body.imageUrl,
    },
  });
  return NextResponse.json(newService);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting' }, { status: 500 });
  }
}