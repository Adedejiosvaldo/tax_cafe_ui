import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary size-9">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19V9H7V19H11ZM12 19V9H17V11H13V13H16V15H13V19H12Z M4 21V5Q4 4.175 4.588 3.587Q5.175 3 6 3H18Q18.825 3 19.413 3.587Q20 4.175 20 5V16H18V5H6V21H4Z"></path>
              </svg>
            </div>
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
