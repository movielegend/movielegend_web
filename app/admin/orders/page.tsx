import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import OrderManager from './OrderManager';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  let ordersList: any[] = [];
  try {
    ordersList = await prisma.order.findMany({
      where: { deletedAt: null },
      include: {
        customer: true,
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
  }

  return <OrderManager initialOrders={serializePrisma(ordersList)} />;
}