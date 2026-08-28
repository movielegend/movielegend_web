import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serial = searchParams.get('serial');

    if (!serial) {
      return NextResponse.json({ error: 'Vui lòng cung cấp số Serial' }, { status: 400 });
    }

    const serialRecord = await prisma.serialNumber.findUnique({
      where: { serial },
      include: {
        product: true,
        warranty: {
          include: { customer: true }
        }
      }
    });

    if (!serialRecord) {
      return NextResponse.json({
        found: false,
        message: 'Không tìm thấy thông tin bảo hành cho số Serial này.'
      }, { status: 404 });
    }

    const isExpired = serialRecord.warranty?.expiryDate 
      ? new Date(serialRecord.warranty.expiryDate) < new Date()
      : false;

    return NextResponse.json({
      found: true,
      serial: serialRecord.serial,
      productName: serialRecord.product.name,
      productSku: serialRecord.product.sku,
      customerName: serialRecord.warranty?.customer.fullName || 'Khách hàng',
      purchaseDate: serialRecord.warranty?.purchaseDate ? new Date(serialRecord.warranty.purchaseDate).toLocaleDateString('vi-VN') : 'N/A',
      expirationDate: serialRecord.warranty?.expiryDate ? new Date(serialRecord.warranty.expiryDate).toLocaleDateString('vi-VN') : 'Chưa kích hoạt',
      status: serialRecord.warranty ? (isExpired ? 'expired' : 'valid') : 'unactivated'
    });
  } catch (error) {
    console.error('Warranty lookup error:', error);
    return NextResponse.json({ error: 'Lỗi tra cứu thông tin bảo hành' }, { status: 500 });
  }
}
