import { Activity, ShoppingCart, TrendingUp, AlertTriangle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ActivityItem } from '@/types/pharmacy';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
  activities: ActivityItem[];
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'sale':
      return TrendingUp;
    case 'purchase':
      return ShoppingCart;
    case 'stock_update':
      return Package;
    case 'alert':
      return AlertTriangle;
    default:
      return Activity;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'sale':
      return 'text-success';
    case 'purchase':
      return 'text-primary';
    case 'stock_update':
      return 'text-accent';
    case 'alert':
      return 'text-warning';
    default:
      return 'text-muted-foreground';
  }
};

const getActivityBadge = (type: ActivityItem['type']) => {
  switch (type) {
    case 'sale':
      return 'Sale';
    case 'purchase':
      return 'Purchase';
    case 'stock_update':
      return 'Stock';
    case 'alert':
      return 'Alert';
    default:
      return 'Activity';
  }
};

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-muted/30 rounded-lg transition-colors duration-200">
              <div className={cn('w-8 h-8 rounded-full bg-muted flex items-center justify-center', getActivityColor(activity.type))}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {getActivityBadge(activity.type)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};