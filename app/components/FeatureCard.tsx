import Icon from './Icon';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
      <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon name={icon} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-text-light-body">{description}</p>
    </div>
  );
}
