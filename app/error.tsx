'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Đã xảy ra lỗi khi tải trang!</h2>
      <p className="text-gray-400 text-sm mb-6 max-w-md">
        {error?.message || 'Có sự cố xảy ra trong quá trình xử lý yêu cầu.'}
      </p>
      <Button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-white text-black font-bold hover:bg-gray-200"
      >
        Thử Tải Lại
      </Button>
    </div>
  );
}
