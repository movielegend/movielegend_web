import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const identifier = resolvedParams.id;
    const isIdNumeric = !isNaN(Number(identifier));

    const product = await prisma.product.findFirst({
      where: isIdNumeric ? { id: Number(identifier) } : { slug: identifier },
      include: {
        category: true,
        brand: true,
        images: true,
        specifications: true,
        reviews: {
          include: { customer: true },
          take: 10
        },
        seo: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Fetch product detail error:', error);
    return NextResponse.json({ error: 'Lỗi lấy thông tin sản phẩm' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = Number(resolvedParams.id);
    const body = await request.json();

    const { name, slug, sku, price, originalPrice, stockQuantity, categoryId, brandId, description, shortDesc, isFeatured, isAvailable } = body;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        slug,
        sku,
        price: price ? parseFloat(price) : undefined,
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity, 10) : undefined,
        description,
        shortDesc,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
        isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : undefined,
        categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
        brandId: brandId ? parseInt(brandId, 10) : undefined,
      },
      include: {
        category: true,
        brand: true,
        images: true,
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Cập nhật sản phẩm thất bại' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = Number(resolvedParams.id);

    await prisma.product.update({
      where: { id: productId },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({ success: true, message: 'Đã xóa sản phẩm' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Xóa sản phẩm thất bại' }, { status: 500 });
  }
}
