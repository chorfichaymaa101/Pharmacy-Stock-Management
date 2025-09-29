import { useState } from 'react';
import { Package, AlertTriangle, Calendar, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { sampleBatches, sampleMedicines } from '@/data/sampleData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const StockPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const stockData = sampleBatches.map(batch => {
    const medicine = sampleMedicines.find(m => m.id === batch.medicineId);
    const stockPercentage = (batch.quantity / batch.initialQuantity) * 100;
    const isLowStock = batch.quantity < 50;
    const isExpiring = batch.expiryDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    return {
      ...batch,
      medicine,
      stockPercentage,
      isLowStock,
      isExpiring,
    };
  });

  const filteredStock = stockData.filter(item =>
    item.medicine?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

const handleEdit = (batch: any) => {
  navigate('/update-stock', { state: { batch } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};




  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-500">Monitor inventory levels and batch information</p>
        </div>
        <div className="flex space-x-3">
         {/* <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
       
          <Button className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:opacity-90">
            <Package className="h-4 w-4 mr-2" />
            Update Stock
          </Button>
           */}
        </div>
      </div>

      {/* Summary Cards (kept simple like original) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Batches</p>
                <p className="text-2xl font-bold">{sampleBatches.length}</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {stockData.filter(item => item.isLowStock).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stockData.filter(item => item.isExpiring).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-md rounded-xl">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by medicine name or batch number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stock List */}
      <div className="grid gap-4">
        {filteredStock.map((item) => (
          <Card
            key={item.id}
            className="shadow-md rounded-xl hover:shadow-lg transition-all duration-200"
          >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.medicine?.name}</h3>
                <p className="text-sm text-gray-500">
                  Batch: {item.batchNumber} | Location: {item.location}
                </p>
              </div>
              <div className="flex space-x-2">
                {item.isLowStock && (
                  <Badge className="bg-red-100 text-red-700">Low Stock</Badge>
                )}
                {item.isExpiring && (
                  <Badge className="bg-yellow-100 text-yellow-700">Expiring Soon</Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Current Stock</p>
                <p className="text-xl font-bold">{item.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Initial Quantity</p>
                <p className="text-lg font-semibold">{item.initialQuantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Manufacture Date</p>
                <p className="text-lg font-semibold">{item.manufactureDate.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className={cn(
                  "text-lg font-semibold",
                  item.isExpiring ? "text-yellow-600" : "text-gray-900"
                )}>
                  {item.expiryDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Stock Level</span>
                <span>{Math.round(item.stockPercentage)}%</span>
              </div>
              <Progress
                value={item.stockPercentage}
                className="h-2 bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-teal-500"
              />
            </div>

            {/* Add Update Stock Button */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => handleEdit(item)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white"
              >
                Update Stock
              </Button>
            </div>
          </CardContent>
           


          </Card>
        ))}
      </div>
    </div>
  );
};

export default StockPage;
