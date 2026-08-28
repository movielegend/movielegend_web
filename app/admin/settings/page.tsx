import React from 'react';
import prisma from '@/lib/prisma';
import { serializePrisma } from '@/lib/utils';
import SettingManager from './SettingManager';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  let settingsList: any[] = [];
  try {
    settingsList = await prisma.setting.findMany({
      where: { deletedAt: null }
    });
  } catch (err) {
    console.error('Error fetching settings:', err);
  }

  return <SettingManager initialSettings={serializePrisma(settingsList)} />;
}
