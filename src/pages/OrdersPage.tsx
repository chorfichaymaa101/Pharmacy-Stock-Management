import { useState } from 'react';
import { Plus, Clock, CheckCircle, AlertCircle, Package, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { sampleOrders } from '@/data/sampleData';



const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredOrders = sampleOrders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'received':
        return CheckCircle;
      case 'partial':
        return Package;
      case 'delayed':
        return AlertCircle;
      default:
        return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'received':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-orange-100 text-orange-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/add-order");
  }; 

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground">Track and manage your purchase orders</p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
          onClick={handleAddOrder}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Orders */}
        <Card className="shadow-card rounded-xl border border-gray-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{sampleOrders.length}</p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="shadow-card rounded-xl border border-gray-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {sampleOrders.filter((o) => o.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>

        {/* Received */}
        <Card className="shadow-card rounded-xl border border-gray-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Received</p>
              <p className="text-2xl font-bold text-green-600">
                {sampleOrders.filter((o) => o.status === 'received').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        {/* Delayed */}
        <Card className="shadow-card rounded-xl border border-gray-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Delayed</p>
              <p className="text-2xl font-bold text-red-600">
                {sampleOrders.filter((o) => o.status === 'delayed').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card rounded-xl">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by order number or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          return (
            <Card
              key={order.id}
              className="shadow-card hover:shadow-lg transition-all duration-200 rounded-xl"
            >
              <CardHeader className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold">{order.orderNumber}</CardTitle>
                  <p className="text-sm text-muted-foreground">{order.supplier}</p>
                </div>
                <Badge
                  className={cn(
                    'capitalize flex items-center space-x-1 px-3 py-1 text-sm rounded-full',
                    getStatusColor(order.status)
                  )}
                >
                  <StatusIcon className="h-4 w-4" />
                  <span>{order.status}</span>
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div>
                    <p>Order Date</p>
                    <p className="font-medium">{order.orderDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p>Expected Delivery</p>
                    <p className="font-medium">{order.expectedDelivery.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p>Items</p>
                    <p className="font-medium">{order.itemCount}</p>
                  </div>
                  <div>
                    <p>Total</p>
                    <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                {/* <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg transition-all"
                  >
                    View Details
                  </Button>
                </div>
                */}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No orders found matching your search.
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
