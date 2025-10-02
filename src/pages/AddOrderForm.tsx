import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type OrderStatus = 'pending' | 'received' | 'partial' | 'delayed';

interface NewOrder {
  orderNumber: string;
  supplier: string;
  status: OrderStatus;
  orderDate: string;
  expectedDelivery: string;
  totalAmount: number;
  itemCount: number;
}

interface AddOrderFormProps {
  onAddOrder?: (order: NewOrder) => void;
}

export const AddOrderForm = ({ onAddOrder }: AddOrderFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [order, setOrder] = useState<NewOrder>({
    orderNumber: '',
    supplier: '',
    status: 'pending',
    orderDate: '',
    expectedDelivery: '',
    totalAmount: 0,
    itemCount: 0,
  });

  const handleChange = (field: keyof NewOrder, value: any) => {
    setOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!order.orderNumber || !order.supplier || !order.orderDate || !order.expectedDelivery) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    // Call parent callback if provided
    if (onAddOrder) onAddOrder(order);

    toast({
      title: 'Order Added',
      description: `Purchase order ${order.orderNumber} has been added.`,
    });

    // Reset form
    setOrder({
      orderNumber: '',
      supplier: '',
      status: 'pending',
      orderDate: '',
      expectedDelivery: '',
      totalAmount: 0,
      itemCount: 0,
    });

    navigate('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <Card className="shadow-card rounded-xl border border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Purchase Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Order Number</Label>
                <Input
                  placeholder="PO-2024-005"
                  value={order.orderNumber}
                  onChange={(e) => handleChange('orderNumber', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Supplier</Label>
                <Input
                  placeholder="Supplier Name"
                  value={order.supplier}
                  onChange={(e) => handleChange('supplier', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleChange('status', value as OrderStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Order Date</Label>
                <Input
                  type="date"
                  value={order.orderDate}
                  onChange={(e) => handleChange('orderDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Expected Delivery</Label>
                <Input
                  type="date"
                  value={order.expectedDelivery}
                  onChange={(e) => handleChange('expectedDelivery', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Total Amount ($)</Label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={order.totalAmount}
                  onChange={(e) => handleChange('totalAmount', parseFloat(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label>Item Count</Label>
                <Input
                  type="number"
                  min={0}
                  value={order.itemCount}
                  onChange={(e) => handleChange('itemCount', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/orders')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white"
              >
                Add Order
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOrderForm;
