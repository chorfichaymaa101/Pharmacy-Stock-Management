import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  leadTime: number;
  rating: number;
  isActive: boolean;
  createdAt: Date;
}

export const AddSupplierForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    leadTime: 3,
    rating: 0,
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Supplier Added',
      description: `${formData.name} has been added successfully.`
    });
    navigate('/suppliers');
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-lg shadow-lg rounded-xl border border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
            Add New Supplier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Supplier Name"
              required
            />
            <Input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Person"
              required
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            <Input
              name="leadTime"
              type="number"
              onChange={handleChange}
              placeholder="Lead Time (days)"
              min={1}
              max={30}
              required
            />
            <Input
              name="rating"
              type="number"
              
              onChange={handleChange}
              placeholder="Rating (0-5)"
              min={0}
              max={5}
              step={0.1}
              required
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label className="text-sm font-medium">Active</label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg transition-all"
            >
              Add Supplier
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSupplierForm;
