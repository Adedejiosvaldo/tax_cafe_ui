import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-light">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="text-primary size-9">
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19V9H7V19H11ZM12 19V9H17V11H13V13H16V15H13V19H12Z M4 21V5Q4 4.175 4.588 3.587Q5.175 3 6 3H18Q18.825 3 19.413 3.587Q20 4.175 20 5V16H18V5H6V21H4Z"></path>
              </svg>
            </div>
            <h2 className="text-gray-900 text-xl font-bold">TaxCafe</h2>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/" className="text-sm text-text-light-body hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-sm text-text-light-body hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-sm text-text-light-body hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/taxai" className="text-sm text-text-light-body hover:text-primary transition-colors">
              TaxAI
            </Link>
            <Link href="#" className="text-sm text-text-light-body hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm text-text-light-body hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-text-light-body hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </nav>
          <p className="text-sm text-text-light-body mt-6 md:mt-0">© 2024 TaxCafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
