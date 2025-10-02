import { useState } from 'react';
import { Activity, Calendar, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleRecentActivity } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';

const ActivityPage = () => {
  const { toast } = useToast();

  const [activities, setActivities] = useState([
    ...sampleRecentActivity,
    {
      id: 'act5',
      type: 'sale' as const,
      description: 'Dispensed 20 units of Ibuprofen to Mary Johnson',
      timestamp: new Date('2024-01-19T14:15:00'),
      userId: 'user1',
    },
    {
      id: 'act6',
      type: 'stock_update' as const,
      description: 'Received new batch of Aspirin - Batch ASP006',
      timestamp: new Date('2024-01-19T10:30:00'),
      userId: 'user2',
    },
    {
      id: 'act7',
      type: 'purchase' as const,
      description: 'Created purchase order PO-2024-005 for Global Health Supply',
      timestamp: new Date('2024-01-18T16:45:00'),
      userId: 'user1',
    },
  ]);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(activities, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_log.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const activityColors = {
    sale: 'text-green-600',
    stock_update: 'text-yellow-500',
    purchase: 'text-blue-500',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Activity Log</h1>
          <p className="text-muted-foreground">Track all pharmacy activities and transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg rounded-xl transition-all duration-200"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Activities</p>
              <p className="text-2xl font-bold">{activities.length}</p>
            </div>
            <Activity className="h-8 w-8 text-purple-600" />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sales</p>
              <p className="text-2xl font-bold text-green-600">
                {activities.filter((a) => a.type === 'sale').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Stock Updates</p>
              <p className="text-2xl font-bold text-yellow-500">
                {activities.filter((a) => a.type === 'stock_update').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Purchases</p>
              <p className="text-2xl font-bold text-blue-500">
                {activities.filter((a) => a.type === 'purchase').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity List */}
      <Card className="shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-4 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <div className={`w-3 h-3 mt-2 rounded-full ${activityColors[activity.type]}`}></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {activity.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPage;
