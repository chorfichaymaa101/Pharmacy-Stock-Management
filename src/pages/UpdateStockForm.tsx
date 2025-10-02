import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sampleMedicines } from '@/data/sampleData';
import { useToast } from "@/hooks/use-toast";

interface BatchFormState {
  id: string;
  medicineName: string;
  medicineId: string;
  batchNumber: string;
  quantity: number;
  initialQuantity: number;
  manufactureDate: string;
  expiryDate: string;
  location: string;
}

export const UpdateStockForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const batchState = location.state as { batch: BatchFormState };
  const { toast } = useToast();
  const [formData, setFormData] = useState<BatchFormState>({
    id: '',
    medicineName: '',
    medicineId: '',
    batchNumber: '',
    quantity: 0,
    initialQuantity: 0,
    manufactureDate: '',
    expiryDate: '',
    location: '',
  });

useEffect(() => {
  if (batchState?.batch) {
    const b = batchState.batch;
    const medicine = sampleMedicines.find(m => m.id === b.medicineId);
    setFormData({
      id: b.id,
      medicineName: medicine?.name || '',
      medicineId: medicine?.id || '',
      batchNumber: b.batchNumber,
      quantity: b.quantity,
      initialQuantity: b.initialQuantity,
      manufactureDate: new Date(b.manufactureDate).toISOString().split('T')[0],
      expiryDate: new Date(b.expiryDate).toISOString().split('T')[0],
      location: b.location,
    });
  }
}, [batchState]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'initialQuantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "✅ Stock Updated",
      description: `Stock has been updated.`,
    });

    setTimeout(() => {
      navigate("/stock", { replace: true, state: { scrollToTop: true } });
    }, 500);
  };

  
  return (
    <div className="max-w-xl mx-auto py-10">
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle>Update Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
              <Input
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Batch Number</label>
              <Input
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Quantity</label>
              <Input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Initial Quantity</label>
              <Input
                name="initialQuantity"
                type="number"
                value={formData.initialQuantity}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Manufacture Date</label>
              <Input
                name="manufactureDate"
                type="date"
                value={formData.manufactureDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <Input
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => navigate('/stock')} className='hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 '>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                Update Stock
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

