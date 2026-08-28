import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import NewsManager from './NewsManager';

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  let newsList: any[] = [];
  try {
    newsList = await prisma.news.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  } catch (err) {
    console.error('Error fetching news:', err);
  }

  return <NewsManager initialNews={serializePrisma(newsList)} />;
}