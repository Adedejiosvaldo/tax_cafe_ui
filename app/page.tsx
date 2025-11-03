import Header from './components/Header';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import FeatureCard from './components/FeatureCard';
import PricingCard from './components/PricingCard';
import Icon from './components/Icon';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: "rocket_launch",
      title: "Smart Onboarding Flow",
      description: "Get set up in minutes. Our intuitive onboarding guides you through every step, making it easy to start your journey to tax confidence."
    },
    {
      icon: "account_balance",
      title: "Account Connection Hub",
      description: "Securely link all your bank accounts in one place. We automatically import and categorize your transactions for a complete financial overview."
    },
    {
      icon: "trending_up",
      title: "Income Tracker",
      description: "Never miss a naira. Monitor all your income streams in real-time, from salaries to side hustles, ensuring everything is accounted for."
    },
    {
      icon: "search",
      title: "The Deduction Hunter",
      description: "Our smart system actively scans your expenses to find every possible tax deduction, maximizing your savings legally."
    },
    {
      icon: "calendar_month",
      title: "Weekly Tax Review",
      description: "Stay ahead with automated weekly summaries of your tax position. No more year-end surprises, just continuous clarity."
    },
    {
      icon: "dashboard",
      title: "Tax Confidence Dashboard",
      description: "Your command center for tax health. See your estimated liability, savings, and compliance status at a single glance."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started with managing their taxes.",
      price: "Free",
      features: [
        "Income Tracker",
        "Basic Expense Categorization",
        "Connect 1 Bank Account"
      ],
      buttonText: "Get Started for Free"
    },
    {
      name: "Professional",
      description: "For freelancers and professionals who need automated tax optimization.",
      price: "₦5,000",
      period: "/month",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "The Deduction Hunter",
        "Weekly Tax Review",
        "Connect up to 5 Bank Accounts",
        "Tax Confidence Dashboard"
      ],
      buttonText: "Choose Professional",
      buttonVariant: "primary" as const
    },
    {
      name: "Business",
      description: "For small businesses requiring advanced features and priority support.",
      price: "₦15,000",
      period: "/month",
      features: [
        "Everything in Professional, plus:",
        "Unlimited Bank Accounts",
        "Audit Protection Guarantee",
        "Priority Support"
      ],
      buttonText: "Choose Business"
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white text-gray-900 font-display">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full" id="hero">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
              <div className="flex flex-col justify-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto lg:mx-0">
                  <div className="flex flex-col gap-4 text-left mb-8">
                    <p className="font-semibold text-primary uppercase tracking-wider">
                      Your Personal Tax Confidence System
                    </p>
                    <h1 className="text-gray-900 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                      Turn Tax Compliance into Financial Confidence.
                    </h1>
                    <p className="text-text-light-body text-base sm:text-lg font-normal leading-relaxed">
                      Confused by new Nigerian tax laws? Worried about penalties? TaxCafe is the clear solution to manage your finances, optimize taxes, and ensure you're always compliant.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-5 p-6 bg-white rounded-xl border border-border-light shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 size-6 text-primary mt-1">
                        <Icon name="magic_button" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 text-base font-bold leading-tight">
                          Automated Tax Handling
                        </h3>
                        <p className="text-text-light-body text-sm font-normal leading-normal">
                          We handle your taxes automatically so you don't have to.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 size-6 text-primary mt-1">
                        <Icon name="savings" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 text-base font-bold leading-tight">
                          Legal Savings Maximized
                        </h3>
                        <p className="text-text-light-body text-sm font-normal leading-normal">
                          Our system finds every legal deduction to save you money.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 size-6 text-primary mt-1">
                        <Icon name="gpp_good" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 text-base font-bold leading-tight">
                          Zero Penalty Guarantee
                        </h3>
                        <p className="text-text-light-body text-sm font-normal leading-normal">
                          Guaranteed compliance and audit protection mean you'll never face penalties.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-primary font-semibold uppercase tracking-wider">
                Everything you need
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                All-in-One Tax Confidence
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-body">
                Our powerful features are designed to give you complete control and peace of mind over your finances and tax obligations.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 sm:py-32" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-primary font-semibold uppercase tracking-wider">
                Simple, Transparent Pricing
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Choose Your Plan
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-body">
                Get started for free or unlock powerful features with our premium plans. No hidden fees, ever.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  period={plan.period}
                  features={plan.features}
                  popular={plan.popular}
                  buttonText={plan.buttonText}
                  buttonVariant={plan.buttonVariant}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-primary size-12 mx-auto">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4H6V6H10V4ZM18 18H14V20H18V18ZM11.1 14.9L14.9 11.1L16.3 12.5L12.5 16.3L11.1 14.9ZM9.8 12.5L7.7 14.6L6.3 13.2L8.4 11.1L9.8 12.5ZM21 12V3Q21 2.175 20.413 1.587Q19.825 1 19 1H5Q4.175 1 3.588 1.587Q3 2.175 3 3V21Q3 21.825 3.588 22.413Q4.175 23 5 23H12V21H5V3H19V12H21Z"></path>
                </svg>
              </div>
              <blockquote className="mt-6">
                <p className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed">
                  "TaxCafe has been a game-changer for my freelance business. I used to dread tax season, but now I feel completely in control. The Deduction Hunter found savings I never would have caught on my own. It's a must-have tool for any professional in Nigeria."
                </p>
              </blockquote>
              <footer className="mt-8">
                <div className="flex items-center justify-center gap-3">
                  <Image
                    alt="Adebayo Cole's avatar"
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs2EBSdb94M1l8f7hdTbvnUCB_M8E_S3zSeoobZ6jYvqKv7MxOQX4KLcKXSAJ0-o92YBt9SS6YbRRysgaK1mUM6QixTssn3aLz4NWxl-F0Wr6WmZBIMouMc-5vT6vvAtsRTcTLLggvGUKtBhuYXh9GBpHpBsWzoMYQwP73vghg2Cv8clig1OjrhOx6X4_jOIyfNihPFxprMNluzbyJjHCOOTXIVZT0Bvq2nxhes4P7MWIMLQR-ZjU9E5xfrGPB51CGMRAxg7iOpwR5"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="text-base font-bold text-gray-900">Adebayo Cole</p>
                    <p className="text-sm text-text-light-body">Digital Marketer, Lagos</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
