import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import WarrantyManager from './WarrantyManager';

export const dynamic = 'force-dynamic';

export default async function AdminWarrantyPage() {
  let warrantiesList: any[] = [];
  try {
    warrantiesList = await prisma.warrantyRegistration.findMany({
      where: { deletedAt: null },
      include: {
        customer: true,
        serialNumber: {
          include: { product: true }
        },
        claims: true
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching warranties:', err);
  }

  return <WarrantyManager initialWarranties={serializePrisma(warrantiesList)} />;
}