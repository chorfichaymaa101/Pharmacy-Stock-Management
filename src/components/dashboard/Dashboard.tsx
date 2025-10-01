import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Calendar,
  Activity
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { AlertCard } from './AlertCard';
import { RecentActivity } from './RecentActivity';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { dashboardMetrics, sampleAlerts } from '@/data/sampleData';

export const Dashboard = () => {
  const metrics = dashboardMetrics;

  return (
    <div className="space-y-6 animate-fade-in px-4 md:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white shadow-medical">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Chaymaa!</h1>
            <p className="text-primary-foreground/80">
              Here's what's happening at your pharmacy today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-primary-foreground/80">Today's Date</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics (keep original gradients) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Medicines"
          value={metrics.totalMedicines}
          change={{ value: '+2.5%', type: 'increase' }}
          icon={Package}
          gradient="primary"
          className="group hover:scale-105 transition-transform duration-300"
        />
        <MetricCard
          title="Stock Value"
          value={`$${metrics.totalValue.toFixed(2)}`}
          change={{ value: '+8.2%', type: 'increase' }}
          icon={DollarSign}
          gradient="success"
          className="group hover:scale-105 transition-transform duration-300"
        />
        <MetricCard
          title="Today's Sales"
          value={`$${metrics.todaySales.toFixed(2)}`}
          change={{ value: '+12.3%', type: 'increase' }}
          icon={TrendingUp}
          gradient="primary"
          className="group hover:scale-105 transition-transform duration-300"
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.lowStockAlerts + metrics.expiryAlerts}
          change={{ value: '-5.1%', type: 'decrease' }}
          icon={AlertTriangle}
          gradient="warning"
          className="group hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stock Levels */}
        <Card className="rounded-xl shadow-xl hover:shadow-2xl border-l-4 border-purple-500 transition-all duration-300">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Stock Levels</h3>
              <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">In Stock</span>
                <span className="text-sm font-medium">{metrics.totalStock} units</span>
              </div>
              <Progress value={85} className="h-3 rounded-full bg-purple-100/40" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Low Stock Items</span>
              <Badge variant="destructive" className="px-2 py-1 text-xs rounded-full animate-pulse">{metrics.lowStockAlerts}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Orders Status */}
        <Card className="rounded-xl shadow-xl hover:shadow-2xl border-l-4 border-green-500 transition-all duration-300">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Orders Status</h3>
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Pending Orders</span>
              <Badge variant="secondary" className="px-2 py-1 text-xs rounded-full animate-pulse">{metrics.pendingOrders}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">This Month</span>
              <span className="text-sm font-medium">24 completed</span>
            </div>
            <Progress value={65} className="h-3 rounded-full bg-green-100/40" />
          </CardContent>
        </Card>

        {/* Expiry Alerts */}
        <Card className="rounded-xl shadow-xl hover:shadow-2xl border-l-4 border-red-500 transition-all duration-300">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Expiry Alerts</h3>
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Expiring Soon</span>
              <Badge variant="destructive" className="px-2 py-1 text-xs rounded-full animate-pulse">{metrics.expiryAlerts}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">This Quarter</span>
              <span className="text-sm font-medium">12 expired</span>
            </div>
            <Progress value={25} className="h-3 rounded-full bg-red-100/40" />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertCard alerts={sampleAlerts} className="rounded-xl shadow-xl hover:shadow-2xl border-l-4 border-blue-500 transition-all duration-300"/>
        <RecentActivity activities={metrics.recentActivity} className="rounded-xl shadow-xl hover:shadow-2xl border-l-4 border-teal-500 transition-all duration-300"/>
      </div>
    </div>
  );
};
