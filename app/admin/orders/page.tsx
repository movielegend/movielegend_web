import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import OrderManager from './OrderManager';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    where: { deletedAt: null },
    include: {
      customer: true,
      orderItems: {
        include: { product: true }
      },
      payments: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return <OrderManager initialOrders={serializePrisma(orders)} />;
}