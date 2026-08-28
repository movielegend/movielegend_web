import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import SettingManager from './SettingManager';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany({
    where: { deletedAt: null }
  });

  return <SettingManager initialSettings={serializePrisma(settings)} />;
}
