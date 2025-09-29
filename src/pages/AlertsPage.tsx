import { useState } from 'react';
import { AlertTriangle, Package, Calendar, CheckCircle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleAlerts } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const AlertsPage = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState(sampleAlerts);

  const getAlertIcon = (type: string) => {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-l-destructive bg-destructive/5';
      case 'high':
        return 'border-l-destructive bg-destructive/10';
      case 'medium':
        return 'border-l-warning bg-warning/10';
      case 'low':
        return 'border-l-muted bg-muted/10';
      default:
        return 'border-l-muted bg-muted/10';
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert Dismissed",
      description: "The selected alert has been removed.",
    });
  };

  const markAllRead = () => {
    setAlerts([]);
    toast({
      title: "All Alerts Dismissed",
      description: "All read alerts have been cleared",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Alerts</h1>
          <p className="text-muted-foreground">Manage pharmacy alerts and notifications</p>
        </div>
        <Button
          className="bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-xl"
          onClick={markAllRead}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Critical', severity: 'critical', icon: AlertTriangle },
          { title: 'High Priority', severity: 'high', icon: Package },
          { title: 'Medium/Low', severity: 'medium', icon: Calendar },
        ].map((summary) => (
          <Card
            key={summary.title}
            className={cn(
              'shadow-lg rounded-2xl border-l-4 border-gray-300 hover:shadow-2xl transition-all duration-300',
              summary.severity === 'critical'
                ? 'border-l-destructive'
                : summary.severity === 'high'
                ? 'border-l-warning'
                : 'border-l-muted'
            )}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{summary.title}</p>
                <p className={`text-2xl font-bold ${summary.severity === 'critical' ? 'text-destructive' : summary.severity === 'high' ? 'text-warning' : 'text-muted-foreground'}`}>
                  {alerts.filter(a => a.severity === summary.severity || (summary.severity === 'medium/low' && (a.severity === 'medium' || a.severity === 'low'))).length}
                </p>
              </div>
              <summary.icon className="h-8 w-8 text-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <Card
              key={alert.id}
              className={cn('shadow-lg rounded-2xl border-l-4 hover:shadow-2xl transition-all duration-300', getSeverityColor(alert.severity))}
            >
              <CardContent className="p-6 flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{alert.message}</p>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span>{alert.createdAt.toLocaleDateString()}</span>
                      <Badge variant="outline" className="text-xs">{alert.type.replace('_', ' ')}</Badge>
                      <Badge variant="outline" className="text-xs capitalize">{alert.severity}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {/* 
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => toast({ title: "Alert Details", description: alert.message })}
                  >
                    View Details
                  </Button>
                  */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full hover:bg-gray-200"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPage;
