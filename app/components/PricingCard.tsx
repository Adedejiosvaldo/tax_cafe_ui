import Icon from './Icon';
import Link from 'next/link';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonVariant?: 'primary' | 'secondary';
}

export default function PricingCard({
  name,
  description,
  price,
  period,
  features,
  popular = false,
  buttonText,
  buttonVariant = 'secondary',
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col p-8 bg-white rounded-xl shadow-lg ${
        popular
          ? 'relative border-2 border-primary shadow-2xl'
          : 'border border-border-light'
      }`}
    >
      {popular && (
        <p className="absolute top-0 -translate-y-1/2 bg-primary text-white px-3 py-1 text-sm font-semibold tracking-wide rounded-full">
          Most Popular
        </p>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-4 text-sm text-text-light-body">{description}</p>
      <p className="mt-6">
        <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        {period && <span className="text-base font-medium text-text-light-body">{period}</span>}
      </p>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Icon name="check_circle" className="text-primary text-base" />
            <span className="text-sm text-text-light-body">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="#"
        className={`mt-8 block w-full py-3 px-6 text-center rounded-lg text-sm font-bold transition-colors ${
          buttonVariant === 'primary'
            ? 'text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            : 'text-primary bg-primary/10 hover:bg-primary/20'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
