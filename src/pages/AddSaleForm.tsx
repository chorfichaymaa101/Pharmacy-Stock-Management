import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SaleFormData {
  saleNumber: string;
  customerName: string;
  customerPhone?: string;
  saleDate: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: 'cash' | 'card' | 'insurance';
  status: 'pending' | 'completed';
  itemCount: number;
}

export const AddSaleForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SaleFormData>({
    saleNumber: '',
    customerName: '',
    customerPhone: '',
    saleDate: new Date().toISOString().split('T')[0],
    totalAmount: 0,
    discount: 0,
    finalAmount: 0,
    paymentMethod: 'cash',
    status: 'pending',
    itemCount: 1,
  });

  const handleChange = (field: keyof SaleFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      updated.finalAmount = updated.totalAmount - updated.discount;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: 'Sale Added',
      description: `Sale ${formData.saleNumber} for ${formData.customerName} has been added.`,
    });

    navigate('/sales');
  };

  return (
    <Card className="shadow-card rounded-xl max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>Add New Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Sale Number *</label>
              <Input
                required
                value={formData.saleNumber}
                onChange={(e) => handleChange('saleNumber', e.target.value)}
                placeholder="S-2024-005"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Customer Name *</label>
              <Input
                required
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Customer Phone</label>
              <Input
              required
                value={formData.customerPhone}
                onChange={(e) => handleChange('customerPhone', e.target.value)}
                placeholder="+1-555-0123"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Sale Date *</label>
              <Input
                required
                type="date"
                value={formData.saleDate}
                onChange={(e) => handleChange('saleDate', e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Total Amount *</label>
              <Input
                required
                type="number"
                value={formData.totalAmount}
                onChange={(e) => handleChange('totalAmount', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Discount</label>
              <Input
              required
                type="number"
                value={formData.discount}
                onChange={(e) => handleChange('discount', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Item Count *</label>
              <Input
                required
                type="number"
                value={formData.itemCount}
                onChange={(e) => handleChange('itemCount', parseInt(e.target.value))}
                placeholder="1"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Payment Method *</label>
              <select
                className="border rounded-xl p-2"
                value={formData.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="insurance">Insurance</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Status *</label>
              <select
                className="border rounded-xl p-2"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-xl hover:opacity-90 transition"
            >
              Add Sale
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSaleForm;
