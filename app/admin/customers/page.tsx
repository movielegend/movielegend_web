import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import CustomerManager from './CustomerManager';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  let customers: any[] = [];
  try {
    customers = await prisma.customer.findMany({
      where: { deletedAt: null },
      include: {
        orders: true
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching customers:', err);
  }

  return <CustomerManager initialCustomers={serializePrisma(customers)} />;
}