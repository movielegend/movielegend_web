import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where: any = {
      deletedAt: null,
    };

    if (category && category !== 'Tất Cả') {
      where.category = {
        name: { contains: category }
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { sku: { contains: search } }
      ];
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
        images: true,
        specifications: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit, 10) : undefined,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, sku, price, originalPrice, stockQuantity, categoryId, brandId, description, shortDesc, isFeatured, images } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        stockQuantity: stockQuantity ? parseInt(stockQuantity, 10) : 0,
        description,
        shortDesc,
        isFeatured: Boolean(isFeatured),
        categoryId: parseInt(categoryId, 10),
        brandId: parseInt(brandId, 10),
        images: images && images.length > 0 ? {
          create: images.map((img: any) => ({
            url: img.url,
            altText: img.altText || name,
            isPrimary: img.isPrimary || false
          }))
        } : undefined
      },
      include: {
        category: true,
        brand: true,
        images: true
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
