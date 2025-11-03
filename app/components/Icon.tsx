import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = "", size = 24 }: IconProps) {
  // Map Material icon names to Lucide icon names
  const iconMap: Record<string, keyof typeof LucideIcons> = {
    'magic_button': 'Sparkles',
    'savings': 'PiggyBank',
    'gpp_good': 'ShieldCheck',
    'rocket_launch': 'Rocket',
    'account_balance': 'Building2',
    'trending_up': 'TrendingUp',
    'search': 'Search',
    'calendar_month': 'CalendarDays',
    'dashboard': 'LayoutDashboard',
    'check_circle': 'CheckCircle2',
    'smart_toy': 'Bot',
    'person': 'User',
    'send': 'Send',
    'bolt': 'Zap',
    'verified': 'BadgeCheck',
    'lock': 'Lock',
  };

  const IconComponent = LucideIcons[iconMap[name] || 'Circle'] as React.ComponentType<{ size?: number; className?: string }>;
  
  return <IconComponent size={size} className={className} />;
}
