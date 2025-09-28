import { Edit, Trash2, Package, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Medicine } from '@/types/pharmacy';
import { sampleBatches } from '@/data/sampleData';
import { cn } from '@/lib/utils';

interface MedicineCardProps {
  medicine: Medicine;
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicineId: string) => void;
}

export const MedicineCard = ({ medicine, onEdit, onDelete }: MedicineCardProps) => {
  const batches = sampleBatches.filter(batch => batch.medicineId === medicine.id);
  const totalStock = batches.reduce((sum, batch) => sum + batch.quantity, 0);
  const isLowStock = totalStock < 50;

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const hasExpiringBatches = batches.some(batch => batch.expiryDate <= sixMonthsFromNow);

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{medicine.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{medicine.genericName}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">{medicine.category}</Badge>
              <Badge variant="outline" className="text-xs">{medicine.dosageForm}</Badge>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="hover:bg-blue-50" onClick={() => onEdit(medicine)}>
              <Edit className="h-4 w-4 text-gray-700" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-red-50" onClick={() => onDelete(medicine.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Medicine Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-gray-500">Brand</p>
            <p className="font-medium">{medicine.brand}</p>
          </div>
          <div>
            <p className="text-gray-500">Strength</p>
            <p className="font-medium">{medicine.strength}</p>
          </div>
          <div>
            <p className="text-gray-500">Unit Cost</p>
            <p className="font-medium">${medicine.unitCost.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Selling Price</p>
            <p className="font-medium">${medicine.sellingPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Stock Info */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-700">
              <Package className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Current Stock</span>
            </div>
            <span className={cn(
              'font-bold text-lg',
              isLowStock ? 'text-red-500' : 'text-green-600'
            )}>
              {totalStock}
            </span>
          </div>

          <div className="flex space-x-2">
            {isLowStock && (
              <div className="flex items-center space-x-1 text-red-500 text-xs font-medium">
                <AlertTriangle className="h-3 w-3" />
                <span>Low Stock</span>
              </div>
            )}
            {hasExpiringBatches && (
              <div className="flex items-center space-x-1 text-orange-400 text-xs font-medium">
                <Calendar className="h-3 w-3" />
                <span>Expiring Soon</span>
              </div>
            )}
          </div>
        </div>

        {/* Profit Margin */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Profit Margin</span>
          </div>
          <span className="text-sm font-bold text-green-600">
            {(((medicine.sellingPrice - medicine.unitCost) / medicine.unitCost) * 100).toFixed(1)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
