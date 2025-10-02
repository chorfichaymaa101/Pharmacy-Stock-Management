import { useState } from 'react';
import { Plus, Search, TrendingUp, DollarSign, ShoppingCart, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { sampleSales } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const SalesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredSales = sampleSales.filter(sale =>
    sale.saleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSalesToday = sampleSales.reduce((sum, sale) => sum + sale.finalAmount, 0);
  const completedSales = sampleSales.filter(sale => sale.status === 'completed').length;

  const handleAddSale = () => {
    navigate("/add-sale");
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'cash':
        return 'text-green-600';
      case 'card':
        return 'text-green-400';
      case 'insurance':
        return 'text-yellow-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales</h1>
          <p className="text-muted-foreground">Track pharmacy sales and transactions</p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
          onClick={handleAddSale}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Sale
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card rounded-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Today's Sales</p>
              <p className="text-2xl font-bold">${totalSalesToday.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="shadow-card rounded-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <p className="text-2xl font-bold">{sampleSales.length}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-green-400" />
          </CardContent>
        </Card>

        <Card className="shadow-card rounded-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedSales}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>

        <Card className="shadow-card rounded-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Sale</p>
              <p className="text-2xl font-bold">${(totalSalesToday / sampleSales.length).toFixed(2)}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card rounded-xl">
        <CardContent className="p-4 relative">
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by sale number or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </CardContent>
      </Card>

      {/* Sales List */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <Card
            key={sale.id}
            className="shadow-card hover:shadow-lg transition-all duration-200 rounded-xl border border-gray-100"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{sale.saleNumber}</h3>
                  <p className="text-sm text-muted-foreground">
                    {sale.customerName}
                    {sale.customerPhone && ` • ${sale.customerPhone}`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                    {sale.status}
                  </Badge>
                  <Badge variant="outline" className={cn(getPaymentMethodColor(sale.paymentMethod))}>
                    {sale.paymentMethod.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 text-sm text-muted-foreground">
                <div>
                  <p>Sale Date</p>
                  <p className="font-medium text-foreground">{sale.saleDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p>Items</p>
                  <p className="font-medium text-foreground">{sale.itemCount} items</p>
                </div>
                <div>
                  <p>Subtotal</p>
                  <p className="font-medium text-foreground">${sale.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p>Discount</p>
                  <p className="font-medium text-foreground">-${sale.discount.toFixed(2)}</p>
                </div>
                <div>
                  <p>Final Amount</p>
                  <p className="font-bold text-lg text-green-600">${sale.finalAmount.toFixed(2)}</p>
                </div>
              </div>

              {/*  <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/sales/${sale.id}/receipt`)}>
                  View Receipt
                </Button>
              {sale.status === 'pending' && (
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90">
                    Complete Sale
                  </Button>
                )}
              </div>
                */}
                
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesPage;
