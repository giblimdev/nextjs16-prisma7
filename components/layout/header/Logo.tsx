// components/Logo.tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
        A
      </div>
      <span className="text-xl font-bold text-indigo-600">MyApp</span>
    </Link>
  );
}
