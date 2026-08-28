import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serial, fullName, phone, email, orderId } = body;

    if (!serial || !fullName || !phone) {
      return NextResponse.json({ error: 'Vui lòng cung cấp đầy đủ Số Serial, Họ tên và Số điện thoại' }, { status: 400 });
    }

    // 1. Find or create Serial Number
    let serialRecord = await prisma.serialNumber.findUnique({
      where: { serial }
    });

    if (!serialRecord) {
      // Find a fallback product
      const firstProduct = await prisma.product.findFirst();
      if (!firstProduct) {
        return NextResponse.json({ error: 'Chưa có sản phẩm trên hệ thống' }, { status: 400 });
      }

      serialRecord = await prisma.serialNumber.create({
        data: {
          serial,
          productId: firstProduct.id,
          status: 'WARRANTY'
        }
      });
    }

    // Check if already registered
    const existingWarranty = await prisma.warrantyRegistration.findUnique({
      where: { serialNumberId: serialRecord.id }
    });

    if (existingWarranty) {
      return NextResponse.json({ error: 'Số Serial này đã được kích hoạt bảo hành trước đó' }, { status: 400 });
    }

    // 2. Find or create Customer
    let customer = await prisma.customer.findFirst({
      where: { OR: [{ phone }, { email: email || undefined }] }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName,
          phone,
          email: email || null
        }
      });
    }

    // 3. Create Warranty Registration (default 12 months)
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(now.getFullYear() + 1);

    const warranty = await prisma.warrantyRegistration.create({
      data: {
        serialNumberId: serialRecord.id,
        customerId: customer.id,
        purchaseDate: now,
        expiryDate: expiryDate
      },
      include: {
        serialNumber: {
          include: { product: true }
        },
        customer: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Kích hoạt bảo hành thành công!',
      warranty
    }, { status: 201 });

  } catch (error) {
    console.error('Activate warranty error:', error);
    return NextResponse.json({ error: 'Kích hoạt bảo hành thất bại' }, { status: 500 });
  }
}
