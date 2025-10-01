import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: LucideIcon;
  className?: string;
  gradient?: string;
}


export const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  className,
  gradient = 'subtle',
}: MetricCardProps) => {
  const gradientClasses = {
    primary: 'bg-gradient-primary',
    success: 'bg-gradient-success',
    warning: 'bg-gradient-warning',
    subtle: 'bg-gradient-subtle',
  };

  return (
    <Card className={cn('shadow-card hover:shadow-elevated transition-all duration-200', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    'text-xs font-medium',
                    change.type === 'increase' && 'text-success',
                    change.type === 'decrease' && 'text-destructive',
                    change.type === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  {change.value}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', gradientClasses[gradient])}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};