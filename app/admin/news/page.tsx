import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import NewsManager from './NewsManager';

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  const newsList = await prisma.news.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' }
  });

  return <NewsManager initialNews={serializePrisma(newsList)} />;
}