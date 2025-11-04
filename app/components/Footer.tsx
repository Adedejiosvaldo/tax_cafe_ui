import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-light">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/tclogo.png"
              alt="TaxCafe Logo"
              width={50}
              height={50}
              //   className="size-9"
            />
            <h2 className="text-gray-900 text-xl font-bold">TaxCafe</h2>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/taxai"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              TaxAI
            </Link>
            <Link
              href="#"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-text-light-body hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
          <p className="text-sm text-text-light-body mt-6 md:mt-0">
            © 2025 TaxCafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
