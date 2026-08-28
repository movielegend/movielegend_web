import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: { deletedAt: null },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: {
              include: { images: true }
            }
          }
        },
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Lỗi lấy danh sách đơn hàng' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, shippingAddr, note, items, paymentMethod = 'COD' } = body;

    if (!fullName || !phone || !shippingAddr || !items || items.length === 0) {
      return NextResponse.json({ error: 'Vui lòng cung cấp đầy đủ thông tin nhận hàng và sản phẩm' }, { status: 400 });
    }

    // 1. Find or Create Customer
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

    // 2. Calculate Total Amount
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      totalAmount += itemPrice * item.quantity;

      orderItemsData.push({
        productId: Number(item.id),
        quantity: Number(item.quantity),
        price: itemPrice
      });
    }

    // 3. Create Order in DB
    const newOrder = await prisma.order.create({
      data: {
        customerId: customer.id,
        totalAmount,
        shippingAddr,
        note: note || null,
        status: 'PENDING',
        orderItems: {
          create: orderItemsData
        },
        payments: {
          create: [
            {
              paymentMethod,
              amount: totalAmount,
              status: 'PENDING'
            }
          ]
        }
      },
      include: {
        customer: true,
        orderItems: {
          include: { product: true }
        },
        payments: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Đặt hàng thành công!',
      order: newOrder
    }, { status: 201 });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Tạo đơn hàng thất bại' }, { status: 500 });
  }
}
