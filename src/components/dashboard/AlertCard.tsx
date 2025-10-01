import { AlertTriangle, Clock, Package, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StockAlert } from '@/types/pharmacy';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alerts: StockAlert[];
}

const getAlertIcon = (type: StockAlert['type']) => {
  switch (type) {
    case 'low_stock':
    case 'out_of_stock':
      return Package;
    case 'expiry_warning':
    case 'expired':
      return Calendar;
    default:
      return AlertTriangle;
  }
};

const getSeverityColor = (severity: StockAlert['severity']) => {
  switch (severity) {
    case 'critical':
      return 'bg-destructive text-destructive-foreground';
    case 'high':
      return 'bg-destructive/80 text-destructive-foreground';
    case 'medium':
      return 'bg-warning text-warning-foreground';
    case 'low':
      return 'bg-secondary text-secondary-foreground';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export const AlertCard = ({ alerts }: AlertCardProps) => {
  const recentAlerts = alerts.slice(0, 5);

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <Badge variant="destructive" className="animate-pulse-subtle">
          {alerts.length} Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={cn(
                'flex items-start space-x-3 p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm',
                alert.severity === 'critical' && 'border-l-destructive bg-destructive/5',
                alert.severity === 'high' && 'border-l-destructive bg-destructive/5',
                alert.severity === 'medium' && 'border-l-warning bg-warning/5',
                alert.severity === 'low' && 'border-l-muted bg-muted/30'
              )}
            >
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', getSeverityColor(alert.severity))}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {alert.createdAt.toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
        {alerts.length > 5 && (
          <Button variant="outline" size="sm" className="w-full mt-4">
            View All Alerts ({alerts.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};