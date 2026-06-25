import { redirect } from 'next/navigation';

export default function WarrantyActivatePage() {
  redirect('/warranty?action=activate');
}
