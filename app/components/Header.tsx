import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/tclogo.png"
              alt="TaxCafe Logo"
              width={36}
              height={36}
              className="size-9"
            />
            <h2 className="text-gray-900 text-xl font-bold">TaxCafe Nigeria</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-600 hover:text-primary text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-primary text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/taxai" className="text-gray-600 hover:text-primary text-sm font-medium transition-colors">
              TaxAI
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary text-sm font-medium transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
