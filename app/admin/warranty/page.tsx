import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import WarrantyManager from './WarrantyManager';

export const dynamic = 'force-dynamic';

export default async function AdminWarrantyPage() {
  const warranties = await prisma.warrantyRegistration.findMany({
    where: { deletedAt: null },
    include: {
      customer: true,
      serialNumber: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return <WarrantyManager initialWarranties={serializePrisma(warranties)} />;
}