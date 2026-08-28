import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import BannerManager from './BannerManager';

export const dynamic = 'force-dynamic';

export default async function BannersPage() {
  const banners = await prisma.banner.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  });

  return <BannerManager initialBanners={serializePrisma(banners)} />;
}
