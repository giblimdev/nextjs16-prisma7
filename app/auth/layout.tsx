// @/app/(auth)/layout.tsx
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200">
        {children}
      </div>
    </main>
  );
}
