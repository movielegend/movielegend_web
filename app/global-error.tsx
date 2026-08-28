'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-black text-white flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Đã xảy ra lỗi hệ thống!</h2>
        <p className="text-gray-400 text-sm mb-6">{error?.message || 'Lỗi toàn cục.'}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-white text-black font-bold"
        >
          Thử lại
        </button>
      </body>
    </html>
  );
}
