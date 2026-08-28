import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import BannerManager from './BannerManager';

export const dynamic = 'force-dynamic';

export default async function BannersPage() {
  let banners: any[] = [];
  try {
    banners = await prisma.banner.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching banners:', err);
  }

  return <BannerManager initialBanners={serializePrisma(banners)} />;
}
