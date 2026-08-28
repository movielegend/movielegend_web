import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import ProductManager from './ProductManager';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  let productsList: any[] = [];
  let categoriesList: any[] = [];
  let brandsList: any[] = [];

  try {
    productsList = await prisma.product.findMany({
      where: { deletedAt: null },
      include: {
        category: true,
        brand: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });

    categoriesList = await prisma.category.findMany({
      where: { deletedAt: null }
    });

    brandsList = await prisma.brand.findMany({
      where: { deletedAt: null }
    });
  } catch (err) {
    console.error('Error fetching products:', err);
  }

  return (
    <ProductManager
      initialProducts={serializePrisma(productsList)}
      categories={serializePrisma(categoriesList)}
      brands={serializePrisma(brandsList)}
    />
  );
}
