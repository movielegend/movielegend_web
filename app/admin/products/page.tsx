import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import ProductManager from './ProductManager';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    where: { deletedAt: null },
    include: {
      category: true,
      brand: true,
      images: true
    },
    orderBy: { createdAt: 'desc' },
  });

  const categories = await prisma.category.findMany({ where: { deletedAt: null } });
  const brands = await prisma.brand.findMany({ where: { deletedAt: null } });

  return (
    <ProductManager 
      initialProducts={serializePrisma(products)} 
      categories={serializePrisma(categories)} 
      brands={serializePrisma(brands)} 
    />
  );
}
