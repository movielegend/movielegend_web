import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.warrantyRegistration.findMany({
      where: { deletedAt: null },
      include: {
        customer: true,
        serialNumber: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch warranty error:', error);
    return NextResponse.json({ error: 'Failed to fetch warranty-registrations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.warrantyRegistration.create({ data: body });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Create warranty error:', error);
    return NextResponse.json({ error: 'Failed to create warranty-registrations' }, { status: 500 });
  }
}
